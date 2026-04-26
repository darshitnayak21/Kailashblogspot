import { useState, useEffect, FormEvent } from "react";
import { auth, db, handleFirestoreError, OperationType } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { motion } from "motion/react";
import { PlusCircle, LogOut, CheckCircle2 } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    category: ""
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) {
        navigate("/admin/login");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  const addBlog = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    const path = "blogs";
    try {
      await addDoc(collection(db, path), {
        ...form,
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setForm({ title: "", description: "", image: "", link: "", category: "" });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-400">Post new insights to the blog.</p>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-white/10 hover:bg-red-400/10 hover:text-red-400 transition-all"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card p-8 rounded-3xl border border-white/5"
        >
          <div className="flex items-center gap-2 text-accent font-bold mb-8">
            <PlusCircle size={20} /> New Post
          </div>

          <form onSubmit={addBlog} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Title</label>
                <input
                  placeholder="Post Title"
                  className="w-full p-3 bg-black/50 border border-white/10 rounded-xl focus:border-accent outline-none"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Category</label>
                <input
                  placeholder="e.g. AI, EV, Startup"
                  className="w-full p-3 bg-black/50 border border-white/10 rounded-xl focus:border-accent outline-none"
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Description</label>
              <textarea
                placeholder="A short summary of the post..."
                rows={3}
                className="w-full p-3 bg-black/50 border border-white/10 rounded-xl focus:border-accent outline-none resize-none"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Image URL</label>
                <input
                  placeholder="https://..."
                  className="w-full p-3 bg-black/50 border border-white/10 rounded-xl focus:border-accent outline-none"
                  value={form.image}
                  onChange={e => setForm({ ...form, image: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Full Article Link</label>
                <input
                  placeholder="https://..."
                  className="w-full p-3 bg-black/50 border border-white/10 rounded-xl focus:border-accent outline-none"
                  value={form.link}
                  onChange={e => setForm({ ...form, link: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button 
                type="submit" 
                disabled={submitting}
                className="flex-1 sm:flex-none px-12 py-4 bg-accent hover:bg-accent/90 rounded-xl font-bold transition-all disabled:opacity-50 active:scale-[0.98]"
              >
                {submitting ? "Publishing..." : "Publish Post"}
              </button>
              
              {success && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-green-400 font-medium"
                >
                  <CheckCircle2 size={18} /> Published!
                </motion.div>
              )}
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
