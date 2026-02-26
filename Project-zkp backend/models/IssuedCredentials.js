import mongoose from "mongoose";

const IssuedCredentialSchema = new mongoose.Schema({
  credentialId: {
    type: String,
    required: true,
    unique: true
  },
  walletId: {
    type: String,
    required: true
  },
  credentialHash: {
    type: String,
    required: true
  },
  signature: {
    type: String,
    required: true
  },
  revoked: {
    type: Boolean,
    default: false
  },
  issuedAt: {
    type: Date,
    default: Date.now
  },
  revokedAt: {
    type: Date,
    default: null
  }
});

export default mongoose.model("IssuedCredential", IssuedCredentialSchema);