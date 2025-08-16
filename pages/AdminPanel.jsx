import React, { useEffect, useState } from 'react'
import { API_URL } from '../api'

export default function AdminPanel(){
  const [albums, setAlbums] = useState([])
  const [form, setForm] = useState({ title:'', url:'', cover:'' })
  const token = localStorage.getItem('deonisos_token') || ''

  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }

  async function load(){
    const a = await fetch(`${API_URL}/api/albums`).then(r=>r.json())
    setAlbums(a)
  }
  useEffect(()=>{ load() }, [])

  async function add(){
    await fetch(`${API_URL}/api/albums`, { method:'POST', headers, body: JSON.stringify(form) })
    setForm({ title:'', url:'', cover:'' }); load()
  }
  async function del(id){
    await fetch(`${API_URL}/api/albums/${id}`, { method:'DELETE', headers })
    load()
  }
  async function uploadCover(e){
    const file = e.target.files[0]; if(!file) return
    const fd = new FormData(); fd.append('file', file)
    const res = await fetch(`${API_URL}/api/upload`, { method:'POST', headers: { 'Authorization': `Bearer ${token}` }, body: fd })
    const data = await res.json()
    setForm(f=>({ ...f, cover: data.url }))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black">Admin Panel</h1>

      <section className="space-y-2">
        <h2 className="font-bold">Create Album</h2>
        <div className="grid md:grid-cols-3 gap-2">
          <input className="bg-black/40 border border-white/15 rounded-lg px-3 py-2" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Title" />
          <input className="bg-black/40 border border-white/15 rounded-lg px-3 py-2" value={form.url} onChange={e=>setForm({...form, url:e.target.value})} placeholder="SoundCloud URL" />
          <input className="bg-black/40 border border-white/15 rounded-lg px-3 py-2" value={form.cover} onChange={e=>setForm({...form, cover:e.target.value})} placeholder="Cover URL" />
        </div>
        <div className="flex items-center gap-2">
          <input type="file" onChange={uploadCover} />
          <button onClick={add} className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15">Add</button>
        </div>
      </section>

      <section>
        <h2 className="font-bold mb-2">Albums</h2>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {albums.map(a => (
            <li key={a.id} className="border border-white/10 rounded-xl p-3">
              <img src={a.cover} alt="" className="w-full h-40 object-cover rounded-md mb-2" />
              <div className="font-semibold">{a.title}</div>
              <div className="text-xs text-white/60 truncate">{a.url}</div>
              <button onClick={()=>del(a.id)} className="mt-2 px-3 py-1.5 rounded bg-white/10 border border-white/20 text-sm">Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}