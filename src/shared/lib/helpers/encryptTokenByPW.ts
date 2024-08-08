const SALT_KEY = import.meta.env.VITE_SALT_KEY;
const IV_KEY = import.meta.env.VITE_IV_KEY;
const ENCRYPTED_TOKEN_KEY = import.meta.env.VITE_ENCRYPTED_REFRESH_TOKEN_KEY;

const getKeyFromPW = async (password: string, salt: Uint8Array) => {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
};

export const encryptToken = async (token: string, password: string) => {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await getKeyFromPW(password, salt);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder();
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(token)
  );

  const encryptedToken = btoa(
    String.fromCharCode(...new Uint8Array(encrypted))
  );

  localStorage.setItem(SALT_KEY, btoa(String.fromCharCode(...salt)));
  localStorage.setItem(IV_KEY, btoa(String.fromCharCode(...iv)));
  return encryptedToken;
};

export async function decryptToken(password: string): Promise<string> {
  const enc = new TextDecoder();
  const encryptedToken = localStorage.getItem(ENCRYPTED_TOKEN_KEY);
  const salt = Uint8Array.from(atob(localStorage.getItem(SALT_KEY)!), (c) =>
    c.charCodeAt(0)
  );
  const iv = Uint8Array.from(atob(localStorage.getItem(IV_KEY)!), (c) =>
    c.charCodeAt(0)
  );

  if (!encryptedToken || !salt || !iv) {
    throw new Error('Missing encrypted data or parameters');
  }

  const key = await getKeyFromPW(password, salt);
  const encryptedData = Uint8Array.from(atob(encryptedToken), (c) =>
    c.charCodeAt(0)
  );

  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    encryptedData
  );

  return enc.decode(decrypted);
}
