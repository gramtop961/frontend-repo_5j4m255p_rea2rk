import { useMemo } from 'react'
import { formatINR } from '../utils/currency'

export default function Cart({ items, onClose, onCheckout }) {
  const total = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items])

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Your Order</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">Close</button>
        </div>

        <div className="flex-1 space-y-3 overflow-auto">
          {items.length === 0 && (
            <p className="text-slate-500">No items yet. Add something tasty!</p>
          )}
          {items.map((it) => (
            <div key={it.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-200">
              <div>
                <p className="font-medium">{it.name}</p>
                <p className="text-sm text-slate-500">Qty: {it.qty}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatINR(it.price * it.qty)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-semibold">{formatINR(total)}</span>
          </div>
          <button onClick={onCheckout} className="w-full py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700">Checkout</button>
        </div>
      </div>
    </div>
  )
}
