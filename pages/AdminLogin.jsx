import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../api'

export default function AdminLogin(){
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    setError('')
    try{
      const res = await fetch(`${API_URL}/api/login`, {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({username, password})
      })
      if(!res.ok){ setError('Invalid credentials'); return }
      const { token } = await res.json()
      localStorage.setItem('deonisos_token', token)
      nav('/admin/panel')
    }catch(err){ setError(String(err)) }
  }

  return (
    <form onSubmit={submit} className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-black">Admin Login</h1>
      <input className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2" value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" />
      <input type="password" className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15">Login</button>
    </form>
  )
}