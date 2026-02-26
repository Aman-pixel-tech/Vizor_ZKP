import express from 'express'
import cors from 'cors'
import crypto from 'crypto'
import dotenv from 'dotenv'
import {connectDB} from './db.js';
import { signCredentialHash } from './utils/signature.js';
import IssuedCredentials from './models/IssuedCredentials.js';
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

  const credentialHash = crypto
    .createHash("sha256")
    .update(credentialString)
    .digest("hex");

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
app.listen(port,()=>{
    console.log(`Server is listening at   http://localhost:${port}`)
})