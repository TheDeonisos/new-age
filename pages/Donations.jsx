import React from 'react'
export default function Donations(){
  return (
    <div>
      <h1 className="text-3xl font-black mb-4">💎 DONATIONS</h1>
      <ul className="space-y-2">
        <li className="border border-white/10 rounded-xl px-4 py-3 flex justify-between">
          <a href="https://donatello.to/TheDeonisos" target="_blank" rel="noreferrer" className="font-semibold">Donatello — TheDeonisos</a><span>↗</span>
        </li>
        <li className="border border-white/10 rounded-xl px-4 py-3 flex justify-between">
          <span className="font-semibold">MONO — 4441111083726889</span>
        </li>
        <li className="border border-white/10 rounded-xl px-4 py-3 flex justify-between">
          <a href="https://www.paypal.com/myaccount/money" target="_blank" rel="noreferrer" className="font-semibold">PayPal</a><span>↗</span>
        </li>
      </ul>
    </div>
  )
}