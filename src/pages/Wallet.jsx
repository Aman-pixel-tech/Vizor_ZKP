import { useEffect, useState } from "react";

export default function Wallet() {
  const [walletId, setWalletId] = useState("");
  const [hasCredential, setHasCredential] = useState(false);

  // Generate wallet ID on first load
  useEffect(() => {
    let id = localStorage.getItem("walletId");

    if (!id) {
      id = "wallet_" + Math.random().toString(36).substring(2, 10);
      localStorage.setItem("walletId", id);
    }

    setWalletId(id);
    setHasCredential(!!localStorage.getItem("credential"));
  }, []);

  // Simulate requesting credential
  const requestCredential = () => {
    const mockCredential = {
      credentialId: "cred_" + Math.random().toString(36).substring(2, 8),
      issuedAt: new Date().toISOString()
    };

    localStorage.setItem("credential", JSON.stringify(mockCredential));
    setHasCredential(true);
    alert("Credential Issued Successfully 🎉");
  };

  // Simulate generating proof
  const generateProof = () => {
    alert("Zero-Knowledge Proof Generated ✔");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white flex items-center justify-center px-6">
      
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 w-full max-w-3xl shadow-2xl">

        <h1 className="text-3xl font-semibold mb-6 text-center">
          Privacy Wallet
        </h1>

        {/* Wallet ID */}
        <div className="bg-white/10 rounded-xl p-4 mb-6">
          <p className="text-sm opacity-80">Wallet ID</p>
          <p className="text-lg font-medium">{walletId}</p>
        </div>

        {/* Credential Status */}
        <div className="bg-white/10 rounded-xl p-4 mb-10">
          <p className="text-sm opacity-80">Credential Status</p>
          <p className="text-lg font-medium">
            {hasCredential ? "Credential Stored ✔" : "No Credential Found ❌"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
          <button
            onClick={requestCredential}
            className="cursor-pointer bg-white text-indigo-600 px-6 py-3 rounded-full font-medium hover:scale-105 transition"
          >
            Request Credential
          </button>

          <button
            onClick={generateProof}
            className="cursor-pointer border border-white/40 px-6 py-3 rounded-full hover:bg-white hover:text-indigo-600 transition"
          >
            Generate Proof
          </button>

        </div>

      </div>

    </div>
  );
}