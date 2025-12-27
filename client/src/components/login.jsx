import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, Mail, Key } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      
      // CRUCIAL FIX: Save both Token AND User Object
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user)); // This was missing!

      toast.success(`WELCOME BACK, ${res.data.user.name.toUpperCase()}`, {
        style: { background: '#121212', color: '#D4AF37', border: '1px solid #D4AF37' }
      });

      // Logic: If Admin, go to Dashboard. If User, go to Events.
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/events');
      }

      // Force a refresh to update the Navbar state immediately
      window.location.reload();

    } catch (err) {
      toast.error(err.response?.data?.message || 'Access Denied: Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-accent/5 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-[#121212] border border-white/5 p-10 rounded-[3rem] shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-gold-accent rounded-2xl flex items-center justify-center text-black mb-6 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              <Lock size={32} />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Member Access</h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Tea-Leaves Inc. Secure Vault</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gold-accent uppercase tracking-widest ml-2">Identity (Email)</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  type="email" 
                  className="w-full bg-black border border-white/10 p-5 pl-12 rounded-2xl outline-none focus:border-gold-accent text-white transition-all font-bold"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gold-accent uppercase tracking-widest ml-2">Security Key</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  type="password" 
                  className="w-full bg-black border border-white/10 p-5 pl-12 rounded-2xl outline-none focus:border-gold-accent text-white transition-all font-bold"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-gold-accent transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
            >
              {loading ? "VERIFYING..." : "AUTHENTICATE"} <ShieldCheck size={20} className="group-hover:rotate-12 transition-transform" />
            </button>
          </form>
        </div>
        
        <div className="text-center mt-8">
           <p className="text-gray-600 text-[10px] uppercase font-bold tracking-widest">
             Need a vault? <span className="text-gold-accent cursor-pointer hover:underline" onClick={() => navigate('/signup')}>Register Here</span>
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;