import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Heart, Award, Mic2, Clapperboard, Map } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen pt-40 pb-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION 1: THE MONOLITH HEADER */}
        <section className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="border-l-4 border-gold-accent pl-8 md:pl-12"
          >
            <h2 className="text-gold-accent font-black tracking-[0.6em] uppercase text-[10px] mb-6">Our DNA</h2>
            <h1 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] mb-12">
              KATHMANDU <br />
              <span className="text-white/10 italic">TO CANADA.</span>
            </h1>
            <p className="max-w-3xl text-gray-400 text-lg md:text-2xl font-medium leading-relaxed">
              Tea-Leaves Inc. is a premium concierge for cultural experiences. We bridge the <span className="text-white font-black italic">8,000-mile</span> gap between Nepal and the global stage through cinematic high-fidelity events.
            </p>
          </motion.div>
        </section>

        {/* SECTION 2: THE CORE PILLARS (Grid Layout) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {[
            { icon: <Mic2 size={32} />, title: "Sonic Heritage", desc: "Bringing legendary Nepali melodies to world-class venues with premium acoustics." },
            { icon: <Clapperboard size={32} />, title: "Film Curation", desc: "Exclusive premieres of Nepali cinematic masterpieces for the global diaspora." },
            { icon: <Map size={32} />, title: "Cultural Map", desc: "Spanning across 15+ major cities, moving over 100,000 hearts across the globe." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#121212] border border-white/5 p-10 rounded-[3rem] hover:border-gold-accent/20 transition-all group"
            >
              <div className="text-gold-accent mb-8 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* SECTION 3: THE GLOBAL IMPACT (Split Layout) */}
        <section className="relative">
          {/* Subtle Background Text */}
          <div className="absolute top-0 right-0 text-[15rem] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter uppercase leading-none">
            Impact
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-gold-accent font-black tracking-[0.4em] uppercase text-[10px] mb-6">The Diaspora</h3>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-10">
                A SECOND <br /><span className="italic text-white/20">HOME FOR SOULS.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-12">
                We believe that distance shouldn't mean disconnection. Our events aren't just gatherings; they are temporal portals that bring the warmth, energy, and spirit of Nepal to the Nepali-Canadian community.
              </p>
              
              <div className="flex flex-wrap gap-12">
                <div>
                  <p className="text-5xl font-black text-white">100K+</p>
                  <p className="text-gold-accent text-[10px] font-black uppercase tracking-widest mt-2">Active Audience</p>
                </div>
                <div className="w-px h-16 bg-white/5 hidden md:block" />
                <div>
                  <p className="text-5xl font-black text-white">15</p>
                  <p className="text-gold-accent text-[10px] font-black uppercase tracking-widest mt-2">Nodal Cities</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gold-accent/5 rounded-[4rem] blur-2xl group-hover:bg-gold-accent/10 transition-all duration-700" />
              <div className="relative bg-[#121212] border border-white/5 rounded-[3.5rem] p-4">
                 <img 
                   src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200" 
                   className="w-full h-[500px] object-cover rounded-[2.5rem] grayscale hover:grayscale-0 transition-all duration-1000"
                   alt="Impact"
                 />
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: THE MISSION FOOTER */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-60 text-center"
        >
          <div className="h-20 w-[1px] bg-gold-accent mx-auto mb-10" />
          <h4 className="text-xl md:text-3xl font-black uppercase tracking-widest mb-4">Establishing Connections</h4>
          <p className="text-gray-600 font-black uppercase text-[10px] tracking-[0.5em]">Himalayan Gold Concierge Verified</p>
        </motion.div>

      </div>
    </div>
  );
};

export default About;