import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center">
      
      <nav className="
        backdrop-blur-xl bg-white/10 
        border border-white/20
        shadow-2xl shadow-black/20
        px-10 py-4
        rounded-full
        flex items-center justify-between
        w-[90%] max-w-6xl
      ">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-white tracking-wide"
        >
          PrivAuth
        </Link>

        {/* Links */}
        <div className="flex gap-8 items-center text-white font-medium">
          <Link to="/" className="hover:text-indigo-200 transition">Home</Link>
          <Link to="/how-it-works" className="hover:text-indigo-200 transition">How It Works</Link>
          <Link to="/features" className="hover:text-indigo-200 transition">Features</Link>
          <Link to="/security" className="hover:text-indigo-200 transition">Security</Link>
          <Link to="/use-cases" className="hover:text-indigo-200 transition">Use Cases</Link>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4">
          <Link
            to="/wallet"
            className="px-5 py-2 rounded-full border border-white/30 text-white hover:bg-white/10 transition"
          >
            Wallet
          </Link>

          <Link
            to="/verifier-login"
            className="px-6 py-2 rounded-full bg-white text-indigo-600 font-semibold hover:scale-105 transition"
          >
            Try Demo
          </Link>
        </div>

      </nav>
    </div>
  );
}