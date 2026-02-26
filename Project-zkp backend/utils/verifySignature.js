import crypto from 'crypto'
import fs from 'fs'

const publicKey = fs.readFileSync("public.pem", "utf8");

 export function verifySignature(hash, signature) {
  const verifier = crypto.createVerify("RSA-SHA256");
  verifier.update(hash);
  verifier.end();

  return verifier.verify(publicKey, signature, "base64");
}

