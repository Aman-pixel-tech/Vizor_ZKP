import express from 'express'
const app =express();

const port =5000;

app.get('/',(req,res)=>{
   res.json({msg:"Welcome"})
})
app.post("/issuer/issue", (req, res) => {
  const {
    walletId,
    age,
    student,
    citizenship,
    aadhaarNumber,
    universityRollNo
  } = req.body;

  console.log("Mock verification using Aadhaar & Roll No");

  const credential = {
    credentialId: "cred_" + Math.random().toString(36).substring(2, 8),
    issuer: "PrivAuth Authority",
    attributes: { age, student, citizenship },
    signature: "digital_signature"
  };

  res.json(credential);
});
app.listen(port,()=>{
    console.log(`Server is listening at   http://localhost:${port}`)
})