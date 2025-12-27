import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); // 2. Initialize navigate

  useEffect(() => {
    axios.get('/api/events').then(res => setEvents(res.data));
  }, []);

  const filtered = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Cinematic Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none">
              THE <br /><span className="text-gold-accent">LINEUP.</span>
            </h1>
          </motion.div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text" 
              placeholder="Search Experiences..." 
              className="w-full bg-white/5 border border-white/10 p-5 pl-12 rounded-2xl outline-none focus:border-gold-accent transition-all font-bold uppercase text-xs tracking-widest"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* High-End Ticket List */}
        <div className="space-y-8">
          {filtered.map((event, i) => (
            <motion.div 
              key={event._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              // 3. Add onClick to the card for full-area clicking
              onClick={() => navigate(`/event/${event._id}`)}
              className="group relative bg-[#121212] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row items-stretch hover:border-gold-accent/40 transition-all duration-500 cursor-pointer"
            >
              <div className="lg:w-1/3 overflow-hidden h-64 lg:h-auto">
                <img src={event.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" alt={event.title} />
              </div>
              
              <div className="p-10 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-gold-accent/10 text-gold-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-gold-accent/20">
                      {event.category}
                    </span>
                    <p className="text-white/20 font-black text-4xl">0{i + 1}</p>
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">{event.title}</h3>
                  <div className="flex flex-wrap gap-6 text-gray-400 font-bold text-xs uppercase tracking-widest">
                    <span className="flex items-center gap-2"><MapPin size={14} className="text-gold-accent" /> {event.location}</span>
                    <span className="flex items-center gap-2"><Calendar size={14} className="text-gold-accent" /> Season 2025</span>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/5 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Pass Access</p>
                    <p className="text-3xl font-black">${event.price} <span className="text-sm text-gray-500">CAD</span></p>
                  </div>
                  {/* The button works automatically since the parent card has the onClick */}
                  <div className="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest group-hover:bg-gold-accent transition-all flex items-center gap-3 group/btn">
                    Secure Ticket <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;