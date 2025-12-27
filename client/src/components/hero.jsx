import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, PlayCircle, Calendar } from 'lucide-react';
// Import Link for navigation
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-screen w-full bg-[#0a0a0a] overflow-hidden flex items-center">
      {/* Background Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0ab0] to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2000" 
          className="w-full h-full object-cover opacity-60 scale-110"
          alt="Concert Background"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 z-20">
        {/* Left Side: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-accent/30 bg-gold-accent/10 text-gold-accent mb-6">
            <Calendar size={14} />
            <span className="text-xs font-bold uppercase tracking-widest">Season 2025 Now Live</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white leading-tight mb-6">
            NEPALI <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-accent to-yellow-200">SOUL</span>,<br />
            CANADIAN STAGE.
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
            Experience the heartbeat of Nepal through world-class concerts, 
            exclusive film premieres, and vibrant community festivals across Canada.
          </p>

          <div className="flex flex-wrap gap-4">
            {/* UPDATED: Explore Events Link */}
            <Link 
              to="/events" 
              className="px-8 py-4 bg-gold-accent text-black font-black rounded-full hover:bg-white transition-all transform hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              EXPLORE EVENTS <Ticket size={20} />
            </Link>

            <button className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-2">
              WATCH TRAILERS <PlayCircle size={20} />
            </button>
          </div>
        </motion.div>

        {/* Right Side: Floating Featured Card */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden lg:block"
        >
          <div className="relative group p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl transform rotate-3 hover:rotate-0 transition-all duration-500">
            <img 
              src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800" 
              className="rounded-2xl w-full h-[400px] object-cover"
              alt="Featured"
            />
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10">
              <p className="text-gold-accent font-bold text-sm mb-1">NEXT BIG THING</p>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">Nepathya Toronto 2025</h3>
              <div className="flex justify-between items-center mt-4">
                <span className="text-white font-black">$85 CAD</span>
                <span className="text-green-400 text-sm font-bold">● 85% SOLD OUT</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Marquee (Social Proof) */}
      <div className="absolute bottom-0 w-full bg-gold-accent py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee font-black text-black text-sm uppercase">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8">● SOLD OUT: NEPATHYA CALGARY ● 12 NEW FILMS ADDED ● CULTURAL FESTIVAL VANCOUVER TICKETS LIVE ●</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;