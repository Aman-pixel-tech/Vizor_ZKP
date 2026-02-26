import express from 'express'
import cors from 'cors'
import crypto, { hash } from 'crypto'
import dotenv from 'dotenv'
import {connectDB} from './db.js';
import { signCredentialHash } from './utils/signature.js';
import IssuedCredentials from './models/IssuedCredentials.js';
import { verifySignature } from './utils/verifySignature.js';
const app =express();
dotenv.config();
connectDB();
const port =5000;

app.get('/',(req,res)=>{
   res.json({msg:"Welcome"})
})


app.use(express.json())
app.use(cors())
 function hashData(data) {
  return crypto
    .createHash("sha256")
    .update(data)
    .digest("hex");
}
app.post("/issuer/issue", async(req, res) => {
  const {
    walletId,
    age,
    student,
    citizenship,
    aadhaarNumber,
    universityRollNo
  } = req.body;

  console.log("Mock verification using Aadhaar & Roll No");


   const aadhaarHash = hashData(aadhaarNumber);
  const rollNoHash = hashData(universityRollNo);

  // Create credential object
  const credential = {
    credentialId: "cred_" + Math.random().toString(36).substring(2, 8),
    issuer: "PrivAuth Authority",
    attributes: {
      age,
      student,
      citizenship
    },
    meta: {
      aadhaarHash,
      rollNoHash
    }
  };

   // 🔹 Step 1 — Hash credential
  const credentialString = JSON.stringify(credential);

  const credentialHash = hashData(credentialString)

  // 🔹 Step 2 — Sign hash
  const signature = signCredentialHash(credentialHash);

  // 🔹 Step 3 signed credential
  const signedCredential = {
    ...credential,
    credentialHash,
    signature
  };
     // 4️⃣ Save only metadata in DB (privacy-preserving)
    await IssuedCredentials.create({
      credentialId: credential.credentialId,
      walletId,
      credentialHash,
      signature
    });
  res.json(signedCredential);
  


  // res.json(credential);
});

app.post("/verifier/login", async (req, res) => {
  try {
    const receivedCredential = req.body;
  //     const credential = {
  //   credentialId: "cred_" + Math.random().toString(36).substring(2, 8),
  //   issuer: "PrivAuth Authority",
  //   attributes: {
  //     age,
  //     student,
  //     citizenship
  //   },
  //   meta: {
  //     aadhaarHash,
  //     rollNoHash
  //   }
  // };

    const { credentialId, credentialHash, signature,issuer,meta } = receivedCredential;
    console.log(issuer,meta)

    // 1️⃣ Recreate hash from received credential (without signature)
    const credentialCopy = {
      credentialId: receivedCredential.credentialId,
      issuer,
      attributes: receivedCredential.attributes,

         meta,
    };



    const recreatedHash = hashData(JSON.stringify(credentialCopy))

    // 2️⃣ Check if credential tampered
    if (recreatedHash !== credentialHash) {
      return res.status(401).json({ message: "Credential tampered" });
    }

    // 3️⃣ Verify issuer signature using public key
    const isValidSignature = verifySignature(credentialHash, signature);
  

    if (!isValidSignature) {
      return res.status(401).json({ message: "Invalid issuer signature" });
    }

    // 4️⃣ Check revocation from issuer DB
    const storedCredential = await IssuedCredentials.findOne({ credentialId });

    if (!storedCredential) {
      return res.status(404).json({ message: "Credential not found" });
    }

    if (storedCredential.revoked) {
      return res.status(403).json({ message: "Credential revoked" });
    }

    // 5️⃣ SUCCESS 🎉
    return res.json({
      message: "Verification successful",
      verified: true
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Verification failed" });
  }
});
app.listen(port,()=>{
    console.log(`Server is listening at   http://localhost:${port}`)
})