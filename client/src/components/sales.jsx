import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, ShoppingBag, ArrowUpRight } from 'lucide-react';

const Sales = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/bookings')
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Sales Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  const totalRevenue = bookings.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

  if (loading) return <div className="h-screen flex items-center justify-center text-gold-accent font-black animate-pulse uppercase tracking-widest">Accessing Ledger...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-gold-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Fiscal Intelligence</h2>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter">Revenue <span className="text-white/20">Stream.</span></h1>
          </div>
          
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="p-8 bg-gold-accent rounded-[2.5rem] text-black min-w-[280px] shadow-[0_0_50px_rgba(212,175,55,0.3)]">
            <span className="font-black text-[10px] uppercase tracking-widest mb-2 block text-center">Total Gross Volume</span>
            <div className="text-5xl font-black text-center">${totalRevenue.toLocaleString()}</div>
          </motion.div>
        </div>

        <div className="bg-[#121212] border border-white/5 rounded-[2.5rem] p-10">
          <h3 className="text-xl font-black uppercase mb-10 flex items-center gap-2 text-white">Live Transactions <ArrowUpRight className="text-gold-accent" size={18}/></h3>
          {bookings.length === 0 ? (
            <p className="text-gray-600 font-bold uppercase tracking-widest text-center py-20">No data detected in the database.</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-black/40 rounded-2xl border border-white/5 hover:border-gold-accent/20 transition-all">
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-10 h-10 bg-gold-accent/10 rounded-full flex items-center justify-center text-gold-accent font-black text-xs">{i+1}</div>
                    <div>
                      <p className="font-black uppercase tracking-tight">{booking.event?.title || "Ticket Sale"}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Ref: {booking._id.substring(0,8)}</p>
                    </div>
                  </div>
                  <p className="font-black text-gold-accent text-xl">+${booking.totalAmount}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sales;