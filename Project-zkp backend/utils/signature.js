import crypto from 'crypto'
import fs from 'fs'

// load issuer private key
const privateKey = fs.readFileSync("private.pem", "utf8");

export function signCredentialHash(hash) {
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(hash);
  signer.end();

  const signature = signer.sign(privateKey, "base64");
  return signature;
}

