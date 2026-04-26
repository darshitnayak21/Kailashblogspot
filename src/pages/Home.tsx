import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import { motion, AnimatePresence } from "motion/react";

const HERO_IMAGES = [
  "https://cdn.prod.website-files.com/60ef088dd8fef99352abb434/64502c47934b682e375a0876_AnyConv.com__Artificial%20Intelligence%20Blog%20Writing%20Using%20AI%20in%2060%20Minutes.webp",
  "https://cdn.prod.website-files.com/66604a97df59732aab43fcc8/674882e878947fd98ea04607_post-23-small.webp",
  "https://www.milesweb.in/blog/wp-content/uploads/2023/04/how-technology-and-innovation-are-changing-the-game.png",
  "https://etimg.etb2bimg.com/photo/119280628.cms",
  "https://www.cyient.com/hubfs/Banner%20image-Feb-02-2024-06-33-11-6675-AM.jpg",
  "https://solariumenergy.in/wp-content/uploads/2024/11/sustainability-1024x576.jpg"
];

export default function Home() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
    <div className="min-h-screen bg-bg">
      <Navbar />
      
      <main>
        {/* Unified Full-View Background Hero with Auto-Scroll */}
        <section className="relative h-[90vh] w-full overflow-hidden border-b border-white/5 bg-black">
          {/* Image Slider Component */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 z-0"
            >
              <img
                src={HERO_IMAGES[currentImageIndex]}
                alt="Tech Background"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>

          {/* Premium Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1A] via-[#0B0F1A]/60 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-transparent z-10"></div>

          {/* Hero Content Overlapping Images */}
          <div className="relative z-20 max-w-7xl mx-auto px-6 h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-[10px] uppercase tracking-widest font-black mb-8 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Insights & Future Trends
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black leading-[1.1] mb-6 tracking-tighter text-white drop-shadow-2xl">
                EXPLORE ALL <br />
                <span className="text-accent">DOMAINS OF TECH</span>
              </h1>
              
              <p className="text-lg text-gray-200 max-w-xl leading-relaxed mb-10 drop-shadow-lg">
                Deep dives into <span className="text-white font-bold">EV, Renewable Energy, AI, Electronics,</span> and more. 
                Our platform bridges the gap between complex innovation and everyday understanding, 
                showcasing the breakthroughs in robotics, sustainable tech, and the startup ecosystem 
                that are redefining our world.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-2xl font-bold transition-all flex items-center gap-2 group shadow-2xl shadow-accent/20 active:scale-95"
                >
                  Explore Articles 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Slider Indicators */}
          <div className="absolute bottom-12 right-12 z-20 flex gap-3">
            {HERO_IMAGES.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentImageIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${idx === currentImageIndex ? 'w-10 bg-accent' : 'w-3 bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </section>

        {/* Content Section */}
        <section id="articles" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-4xl font-black tracking-tighter mb-2 uppercase">Latest Insights</h2>
              <p className="text-gray-500 text-sm font-medium tracking-wide">SHAPING THE WORLD OF TOMORROW</p>
            </div>
            <div className="h-px flex-1 bg-white/5 mb-4 hidden md:block" />
          </div>

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
        </section>
      </main>
    </div>
  );
}
