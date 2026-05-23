import assert from "node:assert/strict";

const API_BASE_URL = (process.env.API_BASE_URL ?? "https://99dev.pro/suwave-api/api/v1").replace(/\/$/, "");
const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
const suffix = `${timestamp}-${Math.random().toString(16).slice(2, 8)}`;

const account = {
  accepted_terms: true,
  cpf: randomCpf(),
  email: `teste.web.bucket.${suffix}@example.com`,
  full_name: `Teste Web Bucket ${suffix}`,
  password: `Teste@${suffix}Aa1`,
  whatsapp: `6699${Math.floor(1000000 + Math.random() * 8999999)}`,
};

const profile = {
  birth_date: "1995-05-17",
  city: "Sinop",
  cpf: account.cpf,
  gender: "nao_informado",
  state: "MT",
  whatsapp: account.whatsapp,
};

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  const contentType = response.headers.get("content-type") ?? "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const detail = typeof body === "string" ? body : JSON.stringify(body, null, 2);
    throw new Error(`${options.method ?? "GET"} ${path} failed with ${response.status}\n${detail}`);
  }

  return body;
}

function authHeaders(token, extra = {}) {
  return {
    Authorization: `Bearer ${token}`,
    ...extra,
  };
}

function pngFile() {
  const png = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=",
    "base64",
  );

  return new File([png], `avatar-${suffix}.png`, { type: "image/png" });
}

function randomCpf() {
  const digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  digits.push(cpfDigit(digits, 10));
  digits.push(cpfDigit(digits, 11));
  return digits.join("");
}

function cpfDigit(digits, factorStart) {
  const total = digits.reduce((sum, digit, index) => sum + digit * (factorStart - index), 0);
  const rest = (total * 10) % 11;
  return rest === 10 ? 0 : rest;
}

async function assertPublicImage(url) {
  const response = await fetch(url);
  assert.equal(response.ok, true, `avatar_url should be publicly readable: ${url}`);
  const contentType = response.headers.get("content-type") ?? "";
  assert.match(contentType, /^image\//, "bucket public URL should return an image content-type");
}

console.log(`[test] API: ${API_BASE_URL}`);
console.log(`[test] criando usuario ${account.email}`);

const registerResult = await request("/auth/register", {
  body: JSON.stringify(account),
  headers: { "Content-Type": "application/json" },
  method: "POST",
});

const token = registerResult?.data?.access_token;
const registeredUser = registerResult?.data?.user;

assert.equal(typeof token, "string", "register should return access_token");
assert.equal(registeredUser.email, account.email);
assert.equal(registeredUser.full_name, account.full_name);
assert.equal(registeredUser.accepted_terms, true);
assert.equal(registeredUser.avatar_url, null);

console.log("[test] completando perfil");

const profileResult = await request("/users/me/profile", {
  body: JSON.stringify(profile),
  headers: authHeaders(token, { "Content-Type": "application/json" }),
  method: "PUT",
});

const profileUser = profileResult?.data?.user;
assert.equal(profileUser.email, account.email);
assert.equal(profileUser.whatsapp, profile.whatsapp);
assert.equal(profileUser.cpf, profile.cpf);
assert.equal(profileUser.city, profile.city);
assert.equal(profileUser.state, profile.state);
assert.equal(profileUser.profile_completed, true);

console.log("[test] enviando foto para bucket pela API");

const formData = new FormData();
formData.append("context", "profile");
formData.append("file", pngFile());

const uploadResult = await request("/uploads/images", {
  body: formData,
  headers: authHeaders(token),
  method: "POST",
});

const uploaded = uploadResult?.data;
assert.equal(typeof uploaded.url, "string", "upload should return final bucket URL");
assert.match(uploaded.url, /^https?:\/\//, "bucket URL should be absolute");
assert.ok(uploaded.storage_file_id !== undefined, "upload should return storage_file_id key");

console.log("[test] conferindo persistencia no banco via /auth/me");

const meResult = await request("/auth/me", {
  headers: authHeaders(token),
});

const me = meResult?.data?.user;
assert.equal(me.email, account.email);
assert.equal(me.full_name, account.full_name);
assert.equal(me.whatsapp, profile.whatsapp);
assert.equal(me.cpf, profile.cpf);
assert.equal(me.avatar_url, uploaded.url);
assert.equal(me.profile_completed, true);

console.log("[test] conferindo leitura publica da imagem no bucket");
await assertPublicImage(me.avatar_url);

console.log("[test] cadastro + perfil + upload + banco + bucket OK");
