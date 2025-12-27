import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard, Ticket, ScanLine, LogOut, LogIn, UserPlus, User } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // --- AUTH LOGIC: Safe Parse ---
  const getUserSafely = () => {
    try {
      const userString = localStorage.getItem('user');
      if (!userString || userString === "undefined") return null;
      return JSON.parse(userString);
    } catch (error) {
      console.error("LocalStorage Corrupted, resetting...");
      localStorage.removeItem('user');
      return null;
    }
  };

  const user = getUserSafely();
  const isAdmin = user && user.isAdmin === true;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.success("SECURE LOGOUT COMPLETE", {
      style: { background: '#121212', color: '#D4AF37', border: '1px solid #D4AF37' }
    });
    navigate('/');
    window.location.reload();
  };

  const navLinks = [
    { name: 'Lineup', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#000000] border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gold-accent rounded-xl flex items-center justify-center font-black text-black group-hover:rotate-12 transition-transform">
            T
          </div>
          <span className="font-black uppercase tracking-tighter text-2xl text-white">
            TEA LEAVES <span className="text-gold-accent">INC.</span>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`text-[13px] font-black uppercase tracking-[0.2em] transition-all hover:text-gold-accent ${
                location.pathname === link.path ? 'text-gold-accent' : 'text-gray-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* TOP RIGHT ACTIONS */}
        <div className="hidden md:flex items-center gap-6 pl-8 border-l border-white/10">
          
          {isAdmin && (
            <Link to="/admin/scanner" title="Gate Scanner" className="text-gold-accent hover:scale-110 transition-all mr-2">
              <ScanLine size={24} />
            </Link>
          )}

          {user ? (
            // LOGGED IN VIEW: PROFILE ICON & LOGOUT
            <div className="flex items-center gap-5">
              <Link to="/my-bookings" title="My Passes" className="text-gray-400 hover:text-gold-accent transition-colors">
                <Ticket size={22} />
              </Link>
              
              {/* User Profile Avatar */}
              <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <div className="w-8 h-8 bg-gold-accent rounded-full flex items-center justify-center text-black font-black text-xs shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User size={14} />}
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest hidden lg:block">
                  {user.name?.split(' ')[0]}
                </span>
              </div>

              <button 
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-500 transition-all ml-2"
                title="Sign Out"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            // LOGGED OUT VIEW: LOGIN & REGISTER
            <div className="flex items-center gap-4">
              <Link 
                to="/login" 
                className="text-white border border-white/10 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <LogIn size={14} /> Log In
              </Link>
              <Link 
                to="/signup" 
                className="bg-gold-accent text-black px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-[0_10px_20px_rgba(212,175,55,0.1)] flex items-center gap-2"
              >
                <UserPlus size={14} /> Register
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU CONTENT */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#0a0a0a] border-t border-white/5 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-8">
              {/* Mobile Profile Header */}
              {user && (
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
                  <div className="w-12 h-12 bg-gold-accent rounded-full flex items-center justify-center text-black font-black text-lg">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-black uppercase tracking-tighter">{user.name}</p>
                    <p className="text-gold-accent text-[10px] font-bold uppercase tracking-widest">Verified Member</p>
                  </div>
                </div>
              )}

              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-black uppercase tracking-tighter text-white"
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex flex-col gap-4">
                {user ? (
                  <>
                    <Link to="/my-bookings" onClick={() => setIsOpen(false)} className="bg-white/5 text-white text-center py-5 rounded-2xl font-black uppercase tracking-widest border border-white/10">
                       My Passes
                    </Link>
                    <button onClick={handleLogout} className="bg-red-500/10 text-red-500 py-5 rounded-2xl font-black uppercase tracking-widest border border-red-500/20">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="border border-white/10 text-white text-center py-5 rounded-2xl font-black uppercase tracking-widest">
                      Log In
                    </Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)} className="bg-gold-accent text-black text-center py-5 rounded-2xl font-black uppercase tracking-widest">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;