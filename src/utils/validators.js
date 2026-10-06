// Shared validation helpers used across the exercises.

// Accepts: name@example.com, first.last+tag@mail.co.in
// Rejects: name, name@, @example.com, name@example, name@@example.com
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

export function isValidEmail(value) {
  return EMAIL_REGEX.test(String(value ?? "").trim());
}

export const PASSWORD_MIN_LENGTH = 6;
