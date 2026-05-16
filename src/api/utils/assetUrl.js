import { API_BASE_URL } from '../config/index.js';

const apiOrigin = (() => {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return '';
  }
})();

export const resolveAssetUrl = (value) => {
  const raw = `${value ?? ''}`.trim();
  if (!raw) return '';
  if (/^(https?:|data:|blob:)/i.test(raw)) return raw;
  if (!apiOrigin) return raw;

  const path = raw.startsWith('/') ? raw : `/${raw}`;
  return `${apiOrigin}${path}`;
};
