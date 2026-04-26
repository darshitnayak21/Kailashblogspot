import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-5 border-b border-white/10 bg-bg sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold tracking-tight hover:text-accent transition-colors">
        Blog<span className="text-accent">Hub</span>
      </Link>
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Home</Link>
        <Link to="/about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">About</Link>
      </div>
    </nav>
  );
}
