import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, ShieldCheck, ArrowLeft, Plus, Minus, LogIn } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const EventDetail = ({ events }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // --- SAFE AUTH HELPER ---
  const getUserSafely = () => {
    try {
      const userString = localStorage.getItem('user');
      if (!userString || userString === "undefined") return null;
      return JSON.parse(userString);
    } catch (error) {
      localStorage.removeItem('user');
      return null;
    }
  };

  const currentUser = getUserSafely();
  const event = events?.find(e => e._id === id);

const handleBooking = async () => {
  const currentUser = getUserSafely(); // Get user from localStorage
  if (!currentUser) return navigate('/login');

  setLoading(true);
  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.post('/api/bookings', {
      eventId: event._id,      // Sending event ID
      userId: currentUser._id, // Sending user ID
      ticketsPurchased: quantity
      // We don't even need to send totalAmount anymore; 
      // the server will calculate it for security!
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.status === 201) {
      toast.success("BOOKING SECURED");
      navigate('/my-bookings');
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Booking Failed");
  } finally {
    setLoading(false);
  }
};

  if (!event) return <div className="h-screen flex items-center justify-center font-black uppercase tracking-[0.5em]">Searching the Vault...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gold-accent transition-all mb-10 uppercase text-[10px] font-black tracking-[0.3em]">
          <ArrowLeft size={14} /> Return to Lineup
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl aspect-video lg:aspect-[4/5]">
              <img src={event.image} className="w-full h-full object-cover" alt={event.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </motion.div>
            
            <div className="mt-12 space-y-8">
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">{event.title}</h1>
              <p className="text-gray-400 text-xl leading-relaxed font-medium max-w-2xl">{event.description || "An exclusive Himalayan Gold experience."}</p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="sticky top-32 p-10 rounded-[3rem] bg-[#121212] border border-white/5 shadow-2xl">
              <div className="space-y-8">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-gold-accent font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">Official Access</span>
                    <p className="text-6xl font-black">${event.price * quantity}</p>
                  </div>
                  <div className="flex items-center bg-black rounded-2xl p-2 border border-white/5">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 hover:text-gold-accent transition-colors"><Minus size={16} /></button>
                    <span className="w-12 text-center font-black text-xl">{quantity}</span>
                    <button onClick={() => setQuantity(q => Math.min(10, q + 1))} className="p-3 hover:text-gold-accent transition-colors"><Plus size={16} /></button>
                  </div>
                </div>

                <div className="space-y-6 pt-8 border-t border-white/5 text-gray-400">
                  <div className="flex items-center gap-4">
                    <MapPin size={18} className="text-gold-accent" />
                    <p className="font-bold uppercase text-xs tracking-widest">{event.location}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Calendar size={18} className="text-gold-accent" />
                    <p className="font-bold uppercase text-xs tracking-widest">Season 2025</p>
                  </div>
                </div>

                {/* DYNAMIC BUTTON BASED ON AUTH STATE */}
                <button 
                  onClick={handleBooking}
                  disabled={loading}
                  className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
                    !currentUser 
                    ? 'bg-gold-accent/10 text-gold-accent border border-gold-accent/20 hover:bg-gold-accent hover:text-black' 
                    : loading ? 'bg-gray-800 text-gray-500' : 'bg-white text-black hover:bg-gold-accent shadow-[0_0_40px_rgba(212,175,55,0.2)]'
                  }`}
                >
                  {loading ? 'Processing...' : !currentUser ? (
                    <span className="flex items-center gap-2">Login to Secure Ticket <LogIn size={20}/></span>
                  ) : (
                    <span className="flex items-center gap-2">Secure Ticket <ShieldCheck size={20} /></span>
                  )}
                </button>
                
                <p className="text-center text-[9px] text-gray-600 font-bold uppercase tracking-[0.3em]">
                  {currentUser ? `Signed in as ${currentUser.name}` : "Himalayan Gold Concierge Verified"}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;