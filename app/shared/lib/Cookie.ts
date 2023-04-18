interface SetCookieOptions {
  maxAge?: number; // Время жизни куки в секундах
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

interface Cookie {
  [key: string]: string;
}

export const getCookie = (name: string): string | null => {
  const cookieStr = document.cookie;
  const cookies: Cookie = {};
  cookieStr.split(";").forEach((c) => {
    const [key, value] = c.trim().split("=");
    cookies[key] = decodeURIComponent(value);
  });
  return cookies[name] || null;
};

export const setCookie = (
  name: string,
  value: string,
  options: SetCookieOptions = {}
): void => {
  let cookieStr = `${name}=${encodeURIComponent(value)}`;

  if (options.maxAge) {
    cookieStr += `; max-age=${options.maxAge}`;
  }

  if (options.expires) {
    cookieStr += `; expires=${options.expires.toUTCString()}`;
  }

  if (options.path) {
    cookieStr += `; path=${options.path}`;
  }

  if (options.domain) {
    cookieStr += `; domain=${options.domain}`;
  }

  if (options.secure) {
    cookieStr += "; secure";
  }

  if (options.httpOnly) {
    cookieStr += "; HttpOnly";
  }

  if (options.sameSite) {
    cookieStr += `; SameSite=${options.sameSite}`;
  }
    console.log(cookieStr);
  document.cookie = cookieStr;
};

export const deleteCookie = (name: string): void => {
  setCookie(name, "", { expires:  new Date('Thu, 01 Jan 1970 00:00:00 UTC') });
};
