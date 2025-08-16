export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export async function api(path, opts={}){
  const res = await fetch(API_URL + path, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers||{}) },
    credentials: 'include',
    ...opts
  })
  if(!res.ok) throw new Error(await res.text())
  try { return await res.json() } catch { return {} }
}