import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { motion } from "motion/react";
import { Lock } from "lucide-react";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/admin/dashboard");
    } catch (err: any) {
      console.error("Login Error:", err);
      setError(`Login failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center pt-32 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card p-10 rounded-3xl w-full max-w-md border border-white/5 shadow-2xl shadow-black/50 text-center"
        >
          <div className="w-16 h-16 bg-accent/20 text-accent rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <Lock size={32} />
          </div>
          <h2 className="text-3xl font-bold mb-2">Admin Portal</h2>
          <p className="text-gray-400 mb-8 text-sm">
            Please sign in with an authorized Google account to access the dashboard.
          </p>

          {error && (
            <p className="text-red-400 text-sm py-3 px-4 bg-red-400/10 rounded-lg border border-red-400/20 mb-6">
              {error}
            </p>
          )}

          <button 
            onClick={handleGoogleLogin} 
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-100 py-4 rounded-xl font-bold transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            {loading ? "Connecting..." : "Sign in with Google"}
          </button>
          
          <p className="mt-8 text-xs text-gray-600 uppercase tracking-widest font-bold">
            Authorized Personnel Only
          </p>
        </motion.div>
      </div>
    </div>
  );
}
