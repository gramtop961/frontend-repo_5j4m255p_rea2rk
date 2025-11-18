import { useEffect, useState } from 'react'
import { formatINR } from '../utils/currency'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function MenuGrid({ onAdd }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/menu`)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchMenu()
  }, [])

  const skeletons = new Array(6).fill(0)

  return (
    <section id="menu" className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Signature Menu</h2>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skeletons.map((_,i) => (
            <div key={i} className="p-4 rounded-2xl border border-slate-200 bg-white animate-pulse h-56" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="group p-4 rounded-2xl border border-slate-200 bg-white hover:shadow-xl transition-all">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 mb-3">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                ) : (
                  <div className="w-full h-full grid place-items-center text-slate-400 text-sm">No Image</div>
                )}
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{item.name}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2">{item.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-700">{formatINR(item.price)}</p>
                  <button onClick={() => onAdd(item)} className="mt-2 text-sm px-3 py-1.5 rounded-lg bg-amber-600 text-white hover:bg-amber-700">Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
