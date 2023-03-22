function _arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export async function signMessage(
  message: string,
  secret: string,
  method: 'hex' | 'base64',
): Promise<string> {
  const encoder = new TextEncoder();
  const key = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign'],
  );

  const signature = await window.crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(message),
  );

  switch (method) {
    case 'hex': {
      return Array.prototype.map
        .call(new Uint8Array(signature), (x: any) =>
          ('00' + x.toString(16)).slice(-2),
        )
        .join('');
    }
    case 'base64': {
      return _arrayBufferToBase64(signature);
    }
    default: {
      ((x: never) => {})(method);
      throw new Error(`Unhandled sign method: ${method}`);
    }
  }
}
