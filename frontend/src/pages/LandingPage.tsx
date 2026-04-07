import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Globe, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-32 px-6 flex flex-col items-center text-center overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight"
        >
          Share your links <br />
          <span className="gradient-text">Beautifully.</span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Actlink is the next-gen link management platform for creators. 
          Combine your digital presence into one stunning, high-performance link.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-6 justify-center mb-24"
        >
          <Link 
            to="/register" 
            className="px-10 py-5 bg-primary text-xl font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95"
          >
            Get Started for Free
          </Link>
          <Link 
            to="/login" 
            className="px-10 py-5 glass text-xl font-bold rounded-2xl hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
          >
            Explore Dashboard
          </Link>
        </motion.div>

        {/* Hero Image Illustration */}
        <motion.div 
          variants={itemVariants}
          className="relative max-w-4xl mx-auto mb-32"
        >
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
          <img 
            src="/hero.png" 
            alt="Actlink Hero" 
            className="relative z-10 w-full rounded-3xl shadow-2xl border border-white/10 hover:border-white/20 transition-colors"
          />
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-32">
          {[
            {
              icon: <Globe className="text-blue-400" />,
              title: "Global Reach",
              desc: "Track visitors from all over the world with detailed geographic insights."
            },
            {
              icon: <Zap className="text-purple-400" />,
              title: "Lightning Fast",
              desc: "Powered by Bun and Elysia for sub-millisecond redirection times."
            },
            {
              icon: <Shield className="text-emerald-400" />,
              title: "Privacy First",
              desc: "Secure link management with encrypted passwords and JWT auth."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="glass p-10 rounded-3xl group"
            >
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed text-lg">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Footer Decoration */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10"></div>
      <p className="text-white/20 mb-20">© 2026 Actlink. Built for performance.</p>
    </div>
  );
};
