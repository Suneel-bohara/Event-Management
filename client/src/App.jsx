import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

// --- CORE COMPONENTS ---
import Navbar from './components/navbar.jsx';
import Hero from './components/hero.jsx';
import Pillars from './components/pillars.jsx';
import Footer from './components/footer.jsx';
import CustomCursor from './components/customCursor.jsx';

// --- PAGE COMPONENTS ---
import Login from './components/login.jsx';
import About from './components/about.jsx';
import Gallery from './components/gallery.jsx';
import EventsPage from './components/eventsPage.jsx';
import MyBookings from './components/myBookings.jsx';
import EventDetail from './components/eventDetail.jsx';

// --- ADMIN COMPONENTS ---
import AdminDashboard from './components/adminDashboard.jsx';
import ProtectedRoute from './components/protectedRoute.jsx';
import Sales from './components/sales.jsx';
import AdminScanner from './components/scanner.jsx';
import Signup from './components/signup.jsx';

const PageWrapper = ({ children }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    {children}
  </motion.div>
);

function AppContent({ events }) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* HOME PAGE */}
            <Route path="/" element={
              <PageWrapper>
                <Hero />
                <Pillars />
                <div className="py-20 bg-[#0a0a0a] text-center px-6">
                  <h2 className="text-4xl font-black uppercase mb-10 text-white tracking-tighter">
                    Current <span className="text-gold-accent">Lineup</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {events?.map(e => (
                      <div 
                        key={e._id} 
                        className="bg-[#121212] p-6 rounded-[2rem] border border-white/5 cursor-pointer hover:border-gold-accent/30 transition-all group"
                        onClick={() => window.location.href = `/event/${e._id}`}
                      >
                        <img src={e.image} className="h-48 w-full object-cover rounded-2xl mb-4 grayscale group-hover:grayscale-0 transition-all" alt="" />
                        <h3 className="font-bold uppercase text-white">{e.title}</h3>
                        <p className="text-gold-accent mt-2 font-black">${e.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </PageWrapper>
            } />

            {/* GENERAL ROUTES */}
            <Route path="/event/:id" element={<PageWrapper><EventDetail events={events} /></PageWrapper>} />
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
            <Route path="/events" element={<PageWrapper><EventsPage /></PageWrapper>} />
            <Route path="/my-bookings" element={<PageWrapper><MyBookings /></PageWrapper>} />
            
            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<ProtectedRoute><PageWrapper><AdminDashboard /></PageWrapper></ProtectedRoute>} />
            <Route path="/admin/sales" element={<ProtectedRoute><PageWrapper><Sales /></PageWrapper></ProtectedRoute>} />
            <Route path="/admin/scanner" element={<ProtectedRoute><PageWrapper><AdminScanner /></PageWrapper></ProtectedRoute>} />
            <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
            
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.log("Database Syncing..."));
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-gold-accent selection:text-black md:cursor-none">
        <Toaster position="top-right" />
        <CustomCursor />
        <AppContent events={events} />
      </div>
    </Router>
  );
}

export default App;