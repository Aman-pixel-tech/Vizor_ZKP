import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifierLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const credential = localStorage.getItem("credential");

    if (!credential) {
      alert("No credential found in wallet.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/verifier/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: credential
      });

      const data = await res.json();

      if (res.ok) {
        alert("Verification successful ✔");
        navigate("/verifier-dashboard");
      } else {
        alert(data.message || "Verification failed");
      }

    } catch (err) {
      alert("Verifier server not running");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center text-white">
      
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 w-full max-w-md text-center shadow-2xl">
        
        <h1 className="text-3xl font-semibold mb-6">
          Verifier Login
        </h1>

        <p className="mb-8 opacity-90">
          Authenticate using your Privacy Wallet credential.
        </p>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="cursor-pointer bg-white text-indigo-600 px-8 py-3 rounded-full font-medium hover:scale-105 transition"
        >
          {loading ? "Verifying..." : "Login with Privacy Wallet"}
        </button>

      </div>
    </div>
  );
}