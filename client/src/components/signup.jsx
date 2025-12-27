import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('/api/auth/register', formData);
      
      // Save user and token to local storage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      toast.success("MEMBERSHIP ACTIVATED", {
        style: { background: '#121212', color: '#D4AF37', border: '1px solid #D4AF37' }
      });

      // Redirect and refresh to update navbar state
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center px-6 pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#121212] p-10 rounded-[3rem] border border-white/5 shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gold-accent rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
            <ShieldCheck size={32} className="text-black" />
          </div>
          <h2 className="text-gold-accent font-black tracking-[0.5em] uppercase text-[10px] mb-2">Identification</h2>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Join the <span className="text-white/20 italic">Lineup</span></h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                type="text" 
                placeholder="Identity Name" 
                className="w-full bg-black border border-white/10 p-5 pl-14 rounded-2xl outline-none focus:border-gold-accent transition-all font-bold text-white" 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                type="email" 
                placeholder="Secure Email" 
                className="w-full bg-black border border-white/10 p-5 pl-14 rounded-2xl outline-none focus:border-gold-accent transition-all font-bold text-white" 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Secure Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                type="password" 
                placeholder="Vault Key" 
                className="w-full bg-black border border-white/10 p-5 pl-14 rounded-2xl outline-none focus:border-gold-accent transition-all font-bold text-white" 
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-gold-accent transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center gap-3 group"
          >
            {loading ? "Activating..." : "Create Vault"} <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </form>

        <p className="text-center mt-10 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
          Already verified? <Link to="/login" className="text-gold-accent hover:underline ml-2">Access Account</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;