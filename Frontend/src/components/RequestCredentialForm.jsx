import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
export default function RequestCredentialForm({ onIssued,setShowForm }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    age: "",
    student: false,
    citizenship: "",
    aadhaarNumber: "",
    universityRollNo: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const requestCredential = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const walletId = localStorage.getItem("walletId");

      const res = await fetch("http://localhost:5000/issuer/issue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          walletId,
          ...form
        })
      });

      const data = await res.json();
      localStorage.setItem("credential", JSON.stringify(data));
      onIssued(data);

    } catch (err) {
      console.log(err)
      // alert("Issuer server not running");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={requestCredential}
      className="bg-white/10 fixed inset-0 backdrop-blur-xl border border-white/20 rounded-3xl p-8 w-full max-w-xl m-auto"
    >
      <IoCloseSharp onClick={()=>setShowForm(false)} className="absolute right-4 top-4 cursor-pointer" size={24} />
      
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Request Digital Credential
      </h2>

      {/* Name */}
      <div className="mb-4">
        <label>Full Name</label>
        <input name="name" required onChange={handleChange}
          className="w-full mt-1 p-3 rounded-xl bg-black/20 border border-white/20" />
      </div>

      {/* Age */}
      <div className="mb-4">
        <label>Age</label>
        <input name="age" type="number" required onChange={handleChange}
          className="w-full mt-1 p-3 rounded-xl bg-black/20 border border-white/20" />
      </div>

      {/* Aadhaar Number */}
      <div className="mb-4">
        <label>Aadhaar Number</label>
        <input name="aadhaarNumber" required onChange={handleChange}
          className="w-full mt-1 p-3 rounded-xl bg-black/20 border border-white/20"
          placeholder="XXXX-XXXX-XXXX" />
      </div>

      {/* University Roll No */}
      <div className="mb-4">
        <label>University Roll Number</label>
        <input name="universityRollNo" required onChange={handleChange}
          className="w-full mt-1 p-3 rounded-xl bg-black/20 border border-white/20" />
      </div>

      {/* Citizenship */}
      <div className="mb-4">
        <label>Citizenship</label>
        <input name="citizenship" required onChange={handleChange}
          className="w-full mt-1 p-3 rounded-xl bg-black/20 border border-white/20" />
      </div>

      {/* Student checkbox */}
      <div className="flex items-center gap-3 mb-6">
        <input type="checkbox" name="student" onChange={handleChange} />
        <label>Are you a student?</label>
      </div>

      <button
        type="submit"
        className="cursor-pointer w-full bg-white text-indigo-600 py-3 rounded-full font-medium hover:scale-105 transition"
      >
        {loading ? "Submitting..." : "Submit & Get Credential"}
      </button>
    </form>
  );
}