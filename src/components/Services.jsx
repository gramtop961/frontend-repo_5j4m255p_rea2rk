import { useEffect, useState } from 'react'
import { Briefcase, Users, Calendar, Truck } from 'lucide-react'

const ICONS = { Briefcase, Users, Calendar, Truck }
const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Services() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/services`)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchServices()
  }, [])

  return (
    <section id="services" className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((svc) => {
          const Icon = ICONS[svc.icon] || Briefcase
          return (
            <div key={svc.id} className="p-5 rounded-2xl border border-slate-200 bg-white">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 grid place-items-center mb-3">
                <Icon size={20} />
              </div>
              <h3 className="font-semibold text-slate-900">{svc.title}</h3>
              <p className="text-slate-500 text-sm">{svc.summary}</p>
              {svc.price_from != null && (
                <p className="mt-2 text-sm text-slate-600">From <span className="font-semibold">${Number(svc.price_from).toFixed(2)}</span></p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
