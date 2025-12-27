import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2">
            <h2 className="text-5xl md:text-7xl font-black text-white/5 uppercase leading-none mb-8 select-none">TEA LEAVES</h2>
            <p className="text-gray-400 text-xl max-w-md leading-relaxed">
              Curating the pulse of Nepali culture for the Canadian stage. Elevating entertainment, one heartbeat at a time.
            </p>
          </div>
          
          <div>
            <h4 className="text-gold-accent font-bold uppercase text-xs tracking-widest mb-8">Navigation</h4>
            <ul className="space-y-4 text-gray-300 font-medium">
              <li><a href="/" className="hover:text-white transition flex items-center gap-2">Home <ArrowUpRight size={14}/></a></li>
              <li><a href="/events" className="hover:text-white transition flex items-center gap-2">All Events <ArrowUpRight size={14}/></a></li>
              <li><a href="/about" className="hover:text-white transition flex items-center gap-2">Our Story <ArrowUpRight size={14}/></a></li>
              <li><a href="/gallery" className="hover:text-white transition flex items-center gap-2">The Archive <ArrowUpRight size={14}/></a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold-accent font-bold uppercase text-xs tracking-widest mb-8">Connect</h4>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold-accent hover:text-black transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
            <p className="mt-8 text-gray-500 text-sm">
              info@tealeavesinc.com<br />
              Toronto, Ontario, CA
            </p>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600">
          <p>© 2025 TEA-LEAVES-INC. ALL RIGHTS RESERVED.</p>
          <p>DESIGNED FOR THE DIASPORA.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;