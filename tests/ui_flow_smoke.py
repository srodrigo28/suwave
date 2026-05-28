from __future__ import annotations

import os
import re
import subprocess
import sys
import time
from pathlib import Path
from urllib.error import URLError
from urllib.parse import urljoin
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
PORT = int(os.environ.get("SUWAVE_WEB_TEST_PORT", "3010"))
BASE_URL = os.environ.get("SUWAVE_WEB_BASE_URL", f"http://127.0.0.1:{PORT}")
LOG_FILE = ROOT / ".next" / "ui-flow-smoke-dev.log"


def fetch(path: str, timeout: int = 15) -> tuple[int, str]:
    request = Request(urljoin(BASE_URL, path), headers={"User-Agent": "suwave-ui-flow-smoke"})
    with urlopen(request, timeout=timeout) as response:
        return response.status, response.read().decode("utf-8", errors="replace")


def server_ready() -> bool:
    try:
        status, _ = fetch("/", timeout=2)
        return status == 200
    except (OSError, URLError, TimeoutError):
        return False


def start_dev_server() -> subprocess.Popen:
    npm = "npm.cmd" if os.name == "nt" else "npm"
    LOG_FILE.parent.mkdir(exist_ok=True)
    log = LOG_FILE.open("w", encoding="utf-8")
    process = subprocess.Popen(
        [npm, "run", "dev", "--", "--port", str(PORT), "--hostname", "127.0.0.1"],
        cwd=ROOT,
        stdout=log,
        stderr=subprocess.STDOUT,
        text=True,
    )

    deadline = time.monotonic() + 90
    while time.monotonic() < deadline:
        if process.poll() is not None:
            log.close()
            raise RuntimeError(f"npm run dev encerrou antes de responder:\n{read_log_tail()}")
        if server_ready():
            log.close()
            return process
        time.sleep(1)

    stop_process(process)
    log.close()
    raise TimeoutError(f"npm run dev nao respondeu em 90 segundos:\n{read_log_tail()}")


def read_log_tail(max_chars: int = 4000) -> str:
    if not LOG_FILE.exists():
        return "log nao encontrado"
    text = LOG_FILE.read_text(encoding="utf-8", errors="replace")
    return text[-max_chars:]


def stop_process(process: subprocess.Popen | None) -> None:
    if not process:
        return

    if process.poll() is not None:
        return

    if os.name == "nt":
        subprocess.run(
            ["taskkill", "/PID", str(process.pid), "/T", "/F"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=False,
        )
        return

    process.terminate()
    try:
        process.wait(timeout=8)
    except subprocess.TimeoutExpired:
        process.kill()


def assert_contains(html: str, expected: str, path: str) -> None:
    if expected not in html:
        raise AssertionError(f"{path} nao contem texto esperado: {expected}")


def assert_link(html: str, href: str, path: str) -> None:
    pattern = rf'href="{re.escape(href)}"'
    if not re.search(pattern, html):
        raise AssertionError(f"{path} nao contem link esperado: {href}")


def assert_page(path: str, expected_text: str, expected_links: list[str] | None = None) -> None:
    status, html = fetch(path)
    if status != 200:
        raise AssertionError(f"{path} respondeu HTTP {status}")
    assert_contains(html, expected_text, path)
    for href in expected_links or []:
        assert_link(html, href, path)
    print(f"[ok] {path}")


def main() -> int:
    owned_process = None
    if not server_ready():
        print("[test] iniciando npm run dev")
        owned_process = start_dev_server()
    else:
        print(f"[test] usando servidor ativo em {BASE_URL}")

    try:
        assert_page("/", "Tudo que você precisa", ["/notifications", "/orders", "/more", "/help"])
        assert_page("/more", "Mais", ["/notifications", "/orders", "/profile"])
        assert_page("/notifications", "Notificacoes", ["/orders/pedido-lanche-salamanca-8391", "/orders"])
        assert_page("/orders", "Entre para ver seus pedidos", ["/auth/login"])
        assert_page("/auth/login", "Entrar", ["/auth/register"])
        assert_page("/listings", "Categorias", ["/listings/vehicles/pickups"])
    finally:
        stop_process(owned_process)

    print("[test] fluxo clicavel web OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
