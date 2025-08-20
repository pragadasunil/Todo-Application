// utils/cls.js
export function cls(...xs) {
  return xs.filter(Boolean).join(" ");
}