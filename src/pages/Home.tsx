import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import { motion } from "motion/react";

export default function Home() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      const path = "blogs";
      try {
        const q = query(collection(db, path), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(data);
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, path);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-2xl mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Insights on <br />
            <span className="text-accent underline decoration-accent/30 underline-offset-8">AI, Tech & Design</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
            Exploring the intersection of artificial intelligence, future tech, and the startups shaping our world next.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-card/50 animate-pulse rounded-2xl border border-white/5" />
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-card/30 rounded-3xl border border-dashed border-white/10">
            <p className="text-gray-500">No blogs found. Start by adding some in the admin dashboard.</p>
          </div>
        )}
      </main>
    </div>
  );
}
