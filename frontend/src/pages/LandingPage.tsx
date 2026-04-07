import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 px-6 flex flex-col items-center text-center overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight">
        Share your links <br />
        <span className="gradient-text">Beautifully.</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-white/60 max-w-2xl mb-12 leading-relaxed">
        Actlink is the next-gen link management platform designed for creators and teams. 
        Track, manage, and share your activity with a single, stunning link.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-20">
        <Link 
          to="/register" 
          className="px-10 py-5 bg-primary text-xl font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/30 hover:scale-105"
        >
          Get Started for Free
        </Link>
        <Link 
          to="/login" 
          className="px-10 py-5 glass text-xl font-bold rounded-2xl hover:bg-white/10 transition-all hover:scale-105"
        >
          View Demo
        </Link>
      </div>

      {/* Feature Cards Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-20 relative px-6 md:px-0">
        <div className="glass p-8 rounded-3xl text-left hover:border-primary/50 transition-all cursor-default">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
             <Layout className="text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Smart Tracking</h3>
          <p className="text-white/50 leading-relaxed text-lg">Detailed analytics for every click, including geographic and device data.</p>
        </div>
        
        <div className="glass p-8 rounded-3xl text-left hover:border-purple-500/50 transition-all cursor-default scale-110 shadow-2xl shadow-purple-500/10">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
             <Layout className="text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Premium Bio</h3>
          <p className="text-white/50 leading-relaxed text-lg">A link-in-bio page that isn't just a list—it's your digital masterpiece.</p>
        </div>

        <div className="glass p-8 rounded-3xl text-left hover:border-emerald-500/50 transition-all cursor-default">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
             <Layout className="text-emerald-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Open-Source</h3>
          <p className="text-white/50 leading-relaxed text-lg">Built with modern tech like Bun, Elysia, and Drizzle. Fast and secure.</p>
        </div>
      </div>
    </div>
  );
};
