import React from 'react';
import { motion } from 'framer-motion';

const galleryImages = [
  { url: "https://images.unsplash.com/photo-1514525253361-bee0483307a0?q=80&w=800", height: "h-[400px]", title: "Electric Nights" },
  { url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800", height: "h-[600px]", title: "Festival Pulse" },
  { url: "https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=800", height: "h-[300px]", title: "Cinema Premiere" },
  { url: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800", height: "h-[500px]", title: "Stage Energy" },
  { url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800", height: "h-[450px]", title: "Cultural Fusion" },
  { url: "https://images.unsplash.com/photo-1429962714451-bb934ecbb4ec?q=80&w=800", height: "h-[550px]", title: "Kathmandu Echo" },
  { url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800", height: "h-[350px]", title: "The Crowd" },
  { url: "https://images.unsplash.com/photo-1520110120385-ad28bc814100?q=80&w=800", height: "h-[500px]", title: "Lights & Shadows" },
];

const Gallery = () => {
  return (
    /* Increased top padding from pt-24 to pt-40 */
    <div className="bg-[#0a0a0a] min-h-screen pt-40 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-20">
          <motion.p 
            initial={{ opacity: 0, tracking: "0.1em" }}
            whileInView={{ opacity: 1, tracking: "0.5em" }}
            className="text-gold-accent font-black uppercase text-[10px] mb-6 text-center tracking-[0.4em]"
          >
            Visual Chronicles
          </motion.p>
          <h1 className="text-7xl md:text-9xl font-black text-white text-center uppercase tracking-tighter leading-none">
            THE <br /><span className="text-white/10 italic">ARCHIVE.</span>
          </h1>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
          {galleryImages.map((img, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
              className="relative group break-inside-avoid rounded-[2.5rem] overflow-hidden cursor-none border border-white/5 bg-[#121212]"
            >
              {/* Image with dynamic height */}
              <img 
                src={img.url} 
                className={`w-full ${img.height} object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0`}
                alt={img.title}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                <p className="text-gold-accent font-black text-[10px] uppercase tracking-[0.3em] mb-2">Moment #{index + 1}</p>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">{img.title}</h3>
              </div>
              
              {/* Refined Static Border on Hover */}
              <div className="absolute inset-6 border border-white/10 rounded-[1.5rem] scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 text-center"
        >
          <div className="h-[1px] w-20 bg-white/10 mx-auto mb-10" />
          <p className="text-gray-600 font-bold uppercase text-[10px] tracking-widest mb-8">End of the Vault</p>
          <button className="px-12 py-5 border border-white/10 rounded-full text-white font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all transform active:scale-95 shadow-2xl">
            Synchronize More Memories
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;