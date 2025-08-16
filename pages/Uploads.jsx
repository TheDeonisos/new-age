import React, { useEffect, useRef, useState } from 'react'

const DB_NAME = "deonisos_uploads_db"; const STORE = "uploads";
function openDB(){ return new Promise((resolve, reject)=>{ const req = indexedDB.open(DB_NAME,1); req.onupgradeneeded=()=>{ const db=req.result; if(!db.objectStoreNames.contains(STORE)){ const os=db.createObjectStore(STORE,{keyPath:"id",autoIncrement:true}); os.createIndex("by_name","name"); os.createIndex("by_time","ts"); } }; req.onsuccess=()=>resolve(req.result); req.onerror=()=>reject(req.error); }); }
async function dbAdd(file){ const db=await openDB(); return new Promise((res,rej)=>{ const tx=db.transaction(STORE,"readwrite"); const put=tx.objectStore(STORE).add({ name:file.name,size:file.size,type:file.type,ts:Date.now(),blob:file }); put.onsuccess=()=>res(put.result); put.onerror=()=>rej(put.error); }); }
async function dbList(){ const db=await openDB(); return new Promise((res,rej)=>{ const tx=db.transaction(STORE,"readonly"); const req=tx.objectStore(STORE).getAll(); req.onsuccess=()=>res(req.result); req.onerror=()=>rej(req.error); }); }
async function dbDelete(id){ const db=await openDB(); return new Promise((res,rej)=>{ const tx=db.transaction(STORE,"readwrite"); const req=tx.objectStore(STORE).delete(id); req.onsuccess=()=>res(); req.onerror=()=>rej(req.error); }); }

export default function Uploads(){
  const [uploads, setUploads] = useState([])
  const fileRef = useRef(null)
  const refresh = async () => setUploads(await dbList())
  useEffect(()=>{ refresh() },[])

  const add = async (files) => { if(!files||!files.length) return; for(const f of Array.from(files)){ await dbAdd(f);} await refresh(); };
  const del = async (id) => { await dbDelete(id); await refresh(); };

  return (
    <div className="space-y-5">
      <h2 className="text-2xl md:text-3xl font-black tracking-wider">Local Uploads</h2>
      <div className="flex flex-wrap items-center gap-3">
        <input ref={fileRef} type="file" multiple className="hidden" onChange={(e)=>add(e.target.files)} />
        <button onClick={()=>fileRef.current?.click()} className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white">Upload Files</button>
        <p className="text-white/60 text-sm">Stored locally (IndexedDB) on this device/browser.</p>
      </div>
      <ul className="divide-y divide-white/10 border border-white/10 rounded-xl">
        {uploads.length===0 && <li className="p-4 text-white/60">No uploads yet.</li>}
        {uploads.map(u=> (
          <li key={u.id} className="p-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-semibold text-white/90 truncate">{u.name}</div>
              <div className="text-white/50 text-xs">{(u.size/1024).toFixed(1)} KB • {u.type||"file"}</div>
            </div>
            <div className="flex items-center gap-2">
              <a href={URL.createObjectURL(u.blob)} download={u.name} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm">Download</a>
              <button onClick={()=>del(u.id)} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}