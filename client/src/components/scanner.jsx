import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Camera } from 'lucide-react';

const AdminScanner = () => {
  const [status, setStatus] = useState("ready"); // ready, verifying, success, error
  const [msg, setMsg] = useState("");

  const handleScan = async (result) => {
    if (result && result.length > 0 && status === "ready") {
      const bookingId = result[0].rawValue;
      setStatus("verifying");

      try {
        const res = await axios.post(`/api/bookings/verify/${bookingId}`);
        setMsg(res.data.eventTitle || "Access Granted");
        setStatus("success");
      } catch (err) {
        setMsg("Invalid or Used Pass");
        setStatus("error");
      }
      
      setTimeout(() => { setStatus("ready"); setMsg(""); }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 pt-32">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <h2 className="text-gold-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Entry Protocol</h2>
          <h1 className="text-5xl font-black uppercase tracking-tighter">The <span className="text-white/20">Gate.</span></h1>
        </div>

        <div className="relative aspect-square rounded-[3rem] overflow-hidden border-4 border-white/5 bg-black shadow-2xl">
          {/* Scanner view  */}
          <Scanner 
            onScan={handleScan} 
            allowMultiple={true}
            styles={{ container: { width: '100%', height: '100%' } }} 
          />

          {/* Visual Overlay */}
          <div className="absolute inset-0 border-[60px] border-[#0a0a0a]/60 pointer-events-none flex items-center justify-center">
             <div className="w-48 h-48 border-2 border-gold-accent/40 rounded-3xl relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gold-accent/50 animate-scan shadow-[0_0_15px_rgba(212,175,55,1)]" />
             </div>
          </div>

          {/* Result States */}
          <AnimatePresence>
            {status !== "ready" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                className={`absolute inset-0 flex flex-col items-center justify-center text-white p-10 backdrop-blur-md ${
                  status === 'success' ? 'bg-green-600/90' : status === 'error' ? 'bg-red-600/90' : 'bg-black/80'
                }`}
              >
                {status === "verifying" && <div className="w-12 h-12 border-4 border-gold-accent border-t-transparent rounded-full animate-spin" />}
                {status === "success" && <ShieldCheck size={80} className="mb-4 animate-bounce" />}
                {status === "error" && <ShieldAlert size={80} className="mb-4 animate-pulse" />}
                <h3 className="text-3xl font-black uppercase text-center">{status === 'verifying' ? 'Verifying...' : status === 'success' ? 'VALID' : 'INVALID'}</h3>
                <p className="mt-2 font-bold uppercase tracking-widest text-sm text-center opacity-80">{msg}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center items-center gap-3 text-gray-500 font-bold uppercase text-[10px] tracking-widest">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Camera Stream Live
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan { animation: scan 2s linear infinite; }
      `}</style>
    </div>
  );
};

export default AdminScanner;