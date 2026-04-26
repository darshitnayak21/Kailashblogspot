import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";

type Props = {
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
};

export default function BlogCard({ title, description, image, link, category }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group bg-card rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-300"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" 
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-accent/10 text-accent rounded-full border border-accent/20">
            {category}
          </span>
        </div>
        <h2 className="text-xl font-bold mb-2 line-clamp-2 leading-tight">{title}</h2>
        <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">{description}</p>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-accent text-sm font-semibold hover:gap-3 transition-all"
        >
          Read Article <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
}
