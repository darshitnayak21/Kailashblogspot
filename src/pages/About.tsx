import Navbar from "../components/Navbar";
import { motion } from "motion/react";

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-8 tracking-tight">About Blog Hub</h1>
          <section className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>
              Blog Hub is a minimalist platform dedicated to sharing high-quality thoughts on the latest trends in technology, 
              focusing specifically on Electric Vehicles (EV), Artificial Intelligence (AI), and the vibrant Startup ecosystem.
            </p>
            <p>
              Built with React, Tailwind CSS, and powered by Firebase, this platform demonstrates the seamless integration 
              of modern frontend tools with a robust serverless backend.
            </p>
            <div className="pt-8 border-t border-white/10">
              <h2 className="text-white font-bold mb-4">Our Focus Areas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['Artificial Intelligence', 'Electric Vehicles', 'Startup Strategy'].map(item => (
                  <div key={item} className="p-4 bg-card rounded-xl border border-white/5 text-sm font-medium text-center">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
}
