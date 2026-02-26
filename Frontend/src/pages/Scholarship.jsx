import { useState } from "react";

export default function Scholarship() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    field: "",
    motivation: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-semibold mb-4">Application Submitted 🎉</h1>
        <p className="opacity-90">
          Your scholarship application has been received.
          No personal data was required.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl mb-6">
        <h1 className="text-3xl font-semibold mb-2">
          Student Scholarship Program
        </h1>
        <p className="opacity-90">
          Apply using privacy-preserving verification.
        </p>
      </div>

      {/* Eligibility Badge */}
      <div className="bg-green-500/20 border border-green-400/40 p-4 rounded-xl mb-6">
        <h2 className="font-medium">Eligibility Verified ✔</h2>
        <p className="text-sm opacity-90">
          Student Status Confirmed • Age Requirement Met
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl space-y-6"
      >
        <div>
          <label>Field of Study</label>
          <input
            name="field"
            required
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-xl bg-black/20 border border-white/20"
            placeholder="Computer Science, Engineering..."
          />
        </div>

        <div>
          <label>Why do you deserve this scholarship?</label>
          <textarea
            name="motivation"
            required
            rows="5"
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-xl bg-black/20 border border-white/20"
            placeholder="Write your motivation..."
          />
        </div>

        <button
          type="submit"
          className="bg-white text-indigo-600 px-8 py-3 rounded-full font-medium hover:scale-105 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}