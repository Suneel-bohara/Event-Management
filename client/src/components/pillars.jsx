import React from 'react';
import { motion } from 'framer-motion';
import { Music, Film, Users } from 'lucide-react';

const PillarData = [
  {
    title: "Live Echoes",
    desc: "Bringing the legendary sounds of Nepal to iconic Canadian arenas. From folk-rock to modern pop.",
    icon: <Music className="text-gold-accent" size={40} />,
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800"
  },
  {
    title: "Silver Screen",
    desc: "Exclusive premieres of Nepali cinema. Connecting storytellers with the diaspora in high-definition.",
    icon: <Film className="text-gold-accent" size={40} />,
    img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800"
  },
  {
    title: "Heritage Hub",
    desc: "Vibrant community festivals celebrating Dashain, Tihar, and more with authentic flavor.",
    icon: <Users className="text-gold-accent" size={40} />,
    img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800"
  }
];

const Pillars = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-gold-accent font-bold tracking-[0.4em] uppercase text-xs mb-4">Our DNA</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            More than just <span className="text-white/20">Events.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {PillarData.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="relative group h-[500px] rounded-3xl overflow-hidden border border-white/5 bg-[#121212]"
            >
              <img src={item.img} className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700" alt={item.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500 origin-left">
                  {item.icon}
                </div>
                <h4 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">{item.title}</h4>
                <p className="text-gray-400 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;