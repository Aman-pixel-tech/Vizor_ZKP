import { useEffect, useState } from "react";
import ModalWrapper from "../components/ModalWrapper";
import RequestCredentialForm from "../components/RequestCredentialForm";

export default function Wallet() {
  const [walletId, setWalletId] = useState("");
  const [credential, setCredential] = useState(null);
  const [loading, setLoading] = useState(false);
const [showForm, setShowForm] = useState(false);

  // Generate walletId + load credential
  useEffect(() => {
    let id = localStorage.getItem("walletId");
    if (!id) {
      id = "wallet_" + Math.random().toString(36).substring(2, 10);
      localStorage.setItem("walletId", id);
    }

    setWalletId(id);

    const storedCredential = localStorage.getItem("credential");
    if (storedCredential) {
      setCredential(JSON.parse(storedCredential));
    }
  }, []);




  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white flex items-center justify-center px-6">
      
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 w-full max-w-3xl shadow-2xl">

        <h1 className="text-3xl font-semibold mb-6 text-center">
          Privacy Wallet
        </h1>

        {/* Wallet ID */}
        <div className="bg-white/10 rounded-xl p-4 mb-6">
          <p className="text-sm opacity-80">Wallet ID</p>
          <p className="text-lg font-medium">{walletId  ? walletId : "Wallet Id not issued"}</p>
        </div>

        {/* 🟡 If NO credential → show only button */}
        {!credential && (
          <div className="text-center">
            <p className="mb-6 text-lg opacity-90">
              No credential found in your wallet.
            </p>

            <button
              onClick={()=>setShowForm(true)}
              disabled={loading}
              className="cursor-pointer bg-white text-indigo-600 px-8 py-3 rounded-full font-medium hover:scale-105 transition"
            >
              {loading ? "Requesting..." : "Request Credential"}
            </button>
          </div>
        )}

        {/* 🟢 If credential exists → show card */}
        {credential && (
          <div className="bg-white/10 rounded-2xl p-6 mt-4">
            <h2 className="text-xl font-semibold mb-4">
              Digital Credential Stored ✔
            </h2>

            <p className="opacity-80 mb-2">
              Issuer: <span className="font-medium">{credential.issuer}</span>
            </p>

            <div className="bg-black/20 rounded-xl p-4 mt-4">
              <p className="text-sm opacity-80 mb-3">
                Private Attributes (Visible only to you)
              </p>

              <ul className="space-y-2">
                <li>• Age: {credential?.attributes?.age}</li>
                <li>• Student: {credential?.attributes?.student ? "Yes" : "No"}</li>
                <li>• Citizenship: {credential?.attributes?.citizenship}</li>
              </ul>
            </div>

            <p className="text-sm mt-4 opacity-80">
              🔒 These attributes never leave your wallet.
            </p>
          </div>
        )}

      </div>
   <ModalWrapper isOpen={showForm}>
  <RequestCredentialForm
  setShowForm= {setShowForm}
    onIssued={(cred) => {
      setCredential(cred);
      setShowForm(false);
    }}
  />
</ModalWrapper>
    </div>
  );
}