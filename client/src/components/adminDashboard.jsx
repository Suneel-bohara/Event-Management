import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Plus, Trash2, Calendar, Users, DollarSign, Activity, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ 
    title: '', 
    description: '', 
    price: '', 
    category: 'Music', 
    totalTickets: '', 
    location: '', 
    venue: '', 
    image: '', 
    date: '' 
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('/api/events');
      setEvents(res.data);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      // Create payload and ensure numbers are actually Numbers
      const payload = {
        ...newEvent,
        price: Number(newEvent.price),
        totalTickets: Number(newEvent.totalTickets)
      };

      await axios.post('/api/events', payload);
      
      toast.success("EVENT DEPLOYED TO LINEUP", {
        style: { background: '#121212', color: '#D4AF37', border: '1px solid #D4AF37' }
      });

      // Reset Form
      setNewEvent({ 
        title: '', description: '', price: '', category: 'Music', 
        totalTickets: '', location: '', venue: '', image: '', date: '' 
      });
      
      fetchEvents();
    } catch (err) {
      console.error("Deployment Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "DEPLOYMENT FAILED");
    }
  };

  const deleteEvent = async (id) => {
    if (window.confirm("Archiving this event will remove it from the public eye. Proceed?")) {
      try {
        // This matches the router.delete('/:id') we just added
        await axios.delete(`/api/events/${id}`);
        
        toast.error("EVENT ARCHIVED", {
          style: { background: '#121212', color: '#ff4b4b', border: '1px solid #ff4b4b' }
        });
        
        fetchEvents(); // Refresh the list
      } catch (err) {
        console.error("Delete failed", err);
        toast.error("COULD NOT DELETE EVENT");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-40 pb-20 px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & STATS */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="text-gold-accent font-black tracking-[0.5em] uppercase text-[10px] mb-4">Command Center</h2>
            <h1 className="text-6xl font-black uppercase tracking-tighter leading-none">
              SYSTEM <span className="text-white/10 italic">OVERVIEW</span>
            </h1>
          </div>
          
          <div className="flex gap-6 w-full md:w-auto">
             <div className="flex-grow md:flex-grow-0 bg-[#121212] border border-white/5 p-6 rounded-[2rem] flex items-center gap-5">
                <div className="w-12 h-12 bg-gold-accent rounded-2xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  <Activity size={24}/>
                </div>
                <div>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Live Nodes</p>
                    <p className="text-2xl font-black">{events.length}</p>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT: ADD EVENT FORM */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 bg-[#121212] border border-white/5 p-10 rounded-[3rem] h-fit lg:sticky lg:top-32"
          >
            <h3 className="text-xl font-black mb-8 uppercase flex items-center gap-3">
              <Plus size={24} className="text-gold-accent" /> Initialize Experience
            </h3>
            
            <form onSubmit={handleAddEvent} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Experience Title</label>
                <input type="text" placeholder="e.g. Midnight Symphony" className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none focus:border-gold-accent transition-all font-bold" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Access Fee ($)</label>
                  <input type="number" placeholder="0" className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none" value={newEvent.price} onChange={e => setNewEvent({...newEvent, price: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Total Slots</label>
                  <input type="number" placeholder="QTY" className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none" value={newEvent.totalTickets} onChange={e => setNewEvent({...newEvent, totalTickets: e.target.value})} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Category</label>
                  <select className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none appearance-none" value={newEvent.category} onChange={e => setNewEvent({...newEvent, category: e.target.value})}>
                    <option value="Music">Music</option>
                    <option value="Movie">Movie</option>
                    <option value="Festival">Festival</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Date</label>
                  <input type="date" className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none text-gray-400" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Location & Venue</label>
                <div className="grid grid-cols-2 gap-4">
                   <input type="text" placeholder="City, Prov" className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} required />
                   <input type="text" placeholder="Venue Name" className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none" value={newEvent.venue} onChange={e => setNewEvent({...newEvent, venue: e.target.value})} required />
                </div>
              </div>

              <input type="text" placeholder="Poster Image URL" className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none" value={newEvent.image} onChange={e => setNewEvent({...newEvent, image: e.target.value})} required />
              <textarea placeholder="Event Narrative..." className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none h-32 resize-none" value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} required />
              
              <button className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-gold-accent transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                Launch Experience
              </button>
            </form>
          </motion.div>

          {/* RIGHT: EVENT LIST */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-xl font-black mb-8 uppercase flex items-center gap-3">
              <Calendar size={24} className="text-gold-accent" /> Active Fleet
            </h3>
            
            {events.map(event => (
              <motion.div 
                layout
                key={event._id}
                className="group bg-[#121212] border border-white/5 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 hover:border-gold-accent/20 transition-all"
              >
                <div className="relative">
                  <img src={event.image} className="w-32 h-32 rounded-[2rem] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                  <div className="absolute -top-2 -right-2 bg-gold-accent text-black text-[8px] font-black px-2 py-1 rounded-full uppercase">Live</div>
                </div>

                <div className="flex-grow text-center md:text-left">
                  <span className="text-[10px] font-black text-gold-accent uppercase tracking-[0.3em]">{event.category}</span>
                  <h4 className="text-2xl font-black uppercase tracking-tight mt-1">{event.title}</h4>
                  <p className="text-[10px] text-gray-500 flex items-center justify-center md:justify-start gap-1 mt-1">
                    <MapPin size={10} /> {event.venue}, {event.location}
                  </p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">Occupancy</span>
                      <span className="text-sm font-black flex items-center gap-1"><Users size={12} className="text-gold-accent"/> {event.soldTickets || 0} / {event.totalTickets}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">Revenue</span>
                      <span className="text-sm font-black text-green-500 flex items-center gap-1"><DollarSign size={12}/> {((event.price || 0) * (event.soldTickets || 0)).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => deleteEvent(event._id)} 
                  className="p-5 bg-red-500/5 text-red-500 rounded-[1.5rem] border border-red-500/10 hover:bg-red-500 hover:text-white transition-all shadow-xl"
                >
                  <Trash2 size={22} />
                </button>
              </motion.div>
            ))}
            
            {events.length === 0 && (
              <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                <p className="text-gray-600 font-black uppercase tracking-widest">Inventory Empty</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;