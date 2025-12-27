import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Ticket, Calendar, MapPin, QrCode, ShieldCheck, Clock, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyPasses = async () => {
      try {
        const userString = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (!userString || !token) return navigate('/login');
        const user = JSON.parse(userString);
        const res = await axios.get(`/api/bookings/user/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Vault Access Error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyPasses();
  }, [navigate]);

  if (loading) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center">
      <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-full h-full bg-gold-accent"
        />
      </div>
      <div className="font-black text-gold-accent tracking-[0.5em] uppercase text-[10px] mt-6">Decrypting Vault...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-40 pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER AREA */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="border-l-4 border-gold-accent pl-8">
            <h2 className="text-gold-accent font-black tracking-[0.6em] uppercase text-[10px] mb-4">Official Archives</h2>
            <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              THE <span className="text-white/10 italic">VAULT.</span>
            </h1>
          </div>
          <button 
            onClick={() => navigate('/events')}
            className="group flex items-center gap-4 bg-white text-black px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-gold-accent transition-all active:scale-95"
          >
            New Access <Navigation size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* PASSES GRID */}
        <div className="grid grid-cols-1 gap-12">
          {bookings.length > 0 ? bookings.map((booking, i) => (
            <motion.div 
              key={booking._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="relative flex flex-col lg:flex-row bg-[#111] border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-gold-accent/20 transition-colors"
            >
              {/* LEFT SIDE: VISUAL STUB */}
              <div className="lg:w-80 h-64 lg:h-auto relative shrink-0 overflow-hidden">
                <img 
                  src={booking.event?.image} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                  alt="" 
                />
                <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                <div className="absolute top-8 left-8">
                  <span className="bg-black/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-lg border border-white/10">
                    Pass #{booking._id.slice(-4).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* CENTER: PRIMARY INFO */}
              <div className="flex-grow p-10 lg:p-14 flex flex-col justify-between relative">
                {/* Perforation Effect */}
                <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px border-r border-dashed border-white/20" />
                
                <div>
                  <div className="flex items-center gap-3 text-gold-accent mb-8">
                    <ShieldCheck size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Identity Verified</span>
                  </div>
                  <h3 className="text-5xl font-black uppercase tracking-tighter mb-10 leading-none group-hover:text-gold-accent transition-colors">
                    {booking.event?.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-10">
                    <div className="space-y-1">
                      <p className="text-[9px] text-white/30 font-black uppercase tracking-widest">Venue</p>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tight">
                        <MapPin size={14} className="text-gold-accent" /> {booking.event?.location}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] text-white/30 font-black uppercase tracking-widest">Entry Date</p>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tight">
                        <Calendar size={14} className="text-gold-accent" /> 
                        {new Date(booking.bookingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-10 border-t border-white/5 flex items-end justify-between">
                  <div>
                    <p className="text-[9px] text-white/20 font-black uppercase mb-2 tracking-widest">Transaction Total</p>
                    <p className="text-4xl font-black leading-none">${booking.totalAmount} <span className="text-xs text-white/30">CAD</span></p>
                  </div>
                  <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                    <p className="text-[8px] text-white/40 font-black uppercase mb-1">Admissions</p>
                    <p className="text-xl font-black text-center">{booking.ticketsPurchased}</p>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: AUTHENTICATION STUB */}
              <div className="lg:w-72 bg-white flex flex-col items-center justify-center p-12 gap-6 relative">
                {/* Visual "Punch" notches */}
                <div className="absolute -left-3 top-0 w-6 h-6 bg-[#0a0a0a] rounded-full hidden lg:block" />
                <div className="absolute -left-3 bottom-0 w-6 h-6 bg-[#0a0a0a] rounded-full hidden lg:block" />
                
                <div className="w-full aspect-square bg-[#f5f5f5] p-4 rounded-3xl border border-black/5">
                   <QRCode 
                    value={booking._id} 
                    size={256} 
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }} 
                    fgColor="#000000"
                    bgColor="transparent"
                   />
                </div>
                <div className="text-center">
                  <p className="text-black font-black text-[10px] uppercase tracking-[0.4em] mb-2">Gate Access</p>
                  <p className="text-black/30 font-black text-[8px] uppercase tracking-tighter">ID: {booking._id.toUpperCase()}</p>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="py-40 text-center rounded-[3rem] border border-dashed border-white/10">
              <Ticket size={48} className="mx-auto text-white/10 mb-8" />
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white/40">Vault Session Empty</h3>
              <button 
                onClick={() => navigate('/events')}
                className="text-gold-accent font-black uppercase text-[10px] tracking-[0.3em] hover:brightness-125"
              >
                Sync New Assets +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;