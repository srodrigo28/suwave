const onlyDigits = (value: string) => value.replace(/\D/g, "");

export function maskCpf(value: string) {
  const digits = onlyDigits(value).slice(0, 11);

  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskDate(value: string) {
  const digits = onlyDigits(value).slice(0, 8);

  return digits
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2");
}

export function maskWhatsapp(value: string) {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 2) {
    return digits ? `(${digits}` : "";
  }

  if (digits.length <= 6) {
    return digits.replace(/(\d{2})(\d{1,4})/, "($1) $2");
  }

  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{1,4})/, "($1) $2-$3");
  }

  return digits.replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3");
}

export function dateDisplayToIso(value: string) {
  const digits = onlyDigits(value);

  if (digits.length !== 8) {
    return "";
  }

  const day = Number(digits.slice(0, 2));
  const month = Number(digits.slice(2, 4));
  const year = Number(digits.slice(4, 8));
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return "";
  }

  return `${year.toString().padStart(4, "0")}-${month
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}

export function dateIsoToDisplay(value?: string) {
  if (!value) {
    return "";
  }

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return maskDate(value);
  }

  return `${match[3]}/${match[2]}/${match[1]}`;
}
