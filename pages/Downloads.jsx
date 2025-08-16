import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { API_URL } from '../api'

export default function Downloads(){
  const [albums, setAlbums] = useState([])
  useEffect(()=>{
    fetch(`${API_URL}/api/albums`).then(r=>r.json()).then(setAlbums).catch(()=>setAlbums([]))
  },[])

  return (
    <div>
      <h1 className="text-3xl mb-6 font-black">🎶 DOWNLOADS</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {albums.map((album, idx) => (
          <motion.a
            key={idx}
            href={album.url}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="relative rounded-xl overflow-hidden group border border-white/15 bg-black/40"
            style={{ boxShadow: '0 0 35px rgba(111, 240, 255, 0.18)' }}
          >
            <div className="relative">
              <img
                src={album.cover}
                alt={album.title}
                className="w-full h-60 object-cover opacity-90 group-hover:opacity-70 transition duration-300"
                loading="lazy"
                onError={(e)=>{ e.currentTarget.style.display='none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-100 group-hover:opacity-100 transition" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <h2 className="text-xl font-extrabold drop-shadow-md">{album.title}</h2>
              <div className="mt-2 inline-block px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-semibold group-hover:bg-white/20 transition">
                Listen ↗
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}