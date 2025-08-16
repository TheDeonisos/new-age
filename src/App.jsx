import React, { useEffect, useMemo, useState } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import Philosophy from './pages/Philosophy'
import Journey from './pages/Journey'
import Downloads from './pages/Downloads'
import Donations from './pages/Donations'
import Uploads from './pages/Uploads'
import AdminLogin from './pages/AdminLogin'
import AdminPanel from './pages/AdminPanel'
import KronosSVG from './components/KronosSVG'

export default function App(){
  const [bgIndex, setBgIndex] = useState(0)
  const [backgrounds, setBackgrounds] = useState([
    '', // встроенный SVG Кронос
  ])
  useEffect(()=>{
    if(backgrounds.length<=1) return
    const id = setInterval(()=> setBgIndex(i => (i+1)%backgrounds.length), 9000)
    return ()=>clearInterval(id)
  }, [backgrounds.length])

  const location = useLocation()

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: '#0a0a0c' }}>
      {backgrounds.map((src, i)=> (
        <img key={i} src={src||undefined} alt="bg"
             className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ${bgIndex===i?'opacity-35':'opacity-0'}`}
        />
      ))}
      <KronosSVG />
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs><pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M 0 0 L 4 0 4 4 0 4 Z" fill="none" stroke="currentColor" strokeWidth="0.05" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-white/10" />
        </svg>
      </div>

      <header className="relative z-20 flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl border border-white/20 flex items-center justify-center" style={{ boxShadow:`0 0 20px #6ef0ff66` }}>
            <span className="text-xl">⌛</span>
          </div>
          <div>
            <Link to="/" className="text-white text-lg md:text-2xl font-black tracking-widest">THE DEONISOS</Link>
            <p className="text-white/70 text-xs md:text-sm">Kronos • Cyber‑Grotesque</p>
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-2 md:gap-3">
          {[['/','Home'], ['/philosophy','Philosophy'], ['/journey','Journey'], ['/downloads','Downloads'], ['/donations','Donations'], ['/uploads','Uploads']].map(([to, label])=> (
            <NavBtn key={to} to={to} label={label} />
          ))}
          <Link to="/admin" className="px-3 md:px-4 py-2 text-xs md:text-sm font-semibold rounded-xl border border-white/15 text-white/80 hover:text-white hover:border-white/40 transition">Admin</Link>
        </nav>
      </header>

      <main className="relative z-10 p-4 md:p-8 min-h-[65vh]">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} initial={{opacity:0, y:40, scale:0.98}} animate={{opacity:1, y:0, scale:1}} exit={{opacity:0, y:-30, scale:0.99}} transition={{type:'spring', stiffness:120, damping:18}}>
            <div className="mx-auto max-w-6xl backdrop-blur-xl bg-black/60 border border-white/10 shadow-2xl rounded-2xl p-5 md:p-8 text-white">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/philosophy" element={<Philosophy />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/downloads" element={<Downloads />} />
                <Route path="/donations" element={<Donations />} />
                <Route path="/uploads" element={<Uploads />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/panel" element={<AdminPanel />} />
                <Route path="*" element={<div>404</div>} />
              </Routes>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="relative z-10 p-6 text-center text-white/60 text-xs">
        <p>© {new Date().getFullYear()} THE DEONISOS • Full‑stack demo (Express + SQLite + JWT). Uploads served from backend.</p>
      </footer>
    </div>
  )
}

function NavBtn({ to, label }){
  const loc = useLocation()
  const active = loc.pathname === to
  return (
    <Link to={to} className={`px-3 md:px-4 py-2 text-xs md:text-sm font-semibold uppercase tracking-wider rounded-xl border transition ${active?'text-white border-white/50':'text-white/80 border-white/15 hover:text-white hover:border-white/40'}`}>{label}</Link>
  )
}