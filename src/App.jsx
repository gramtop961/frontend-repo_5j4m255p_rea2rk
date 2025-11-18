import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import MenuGrid from './components/MenuGrid'
import Services from './components/Services'
import Cart from './components/Cart'
import { formatINR } from './utils/currency'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id)
      if (exists) {
        return prev.map((p) => p.id === item.id ? { ...p, qty: p.qty + 1 } : p)
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }]
    })
    setCartOpen(true)
  }

  const handleCheckout = async () => {
    if (cart.length === 0) return
    const payload = {
      items: cart.map((c) => ({ menu_item_id: c.id, name: c.name, unit_price: c.price, quantity: c.qty })),
      customer: { name: 'Walk-in', phone: 'N/A', notes: '' }
    }
    try {
      const res = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Checkout failed')
      const order = await res.json()
      alert(`Order placed! Total: ${formatINR(order.total_amount)}`)
      setCart([])
      setCartOpen(false)
    } catch (e) {
      alert(e.message)
    }
  }

  const heroStats = useMemo(() => ([
    { label: 'Signature Brews', value: '20+' },
    { label: 'Happy Customers', value: '5k+' },
    { label: 'Daily Roasted', value: 'Fresh' },
  ]), [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 text-slate-900">
      <Navbar onCartOpen={() => setCartOpen(true)} />

      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-widest text-amber-600 text-sm">Bbrother Cafe</p>
            <h2 className="mt-2 text-4xl sm:text-6xl font-extrabold leading-tight">
              New generation coffee & services experience
            </h2>
            <p className="mt-4 text-slate-600 text-lg">Order signature drinks, book services, and enjoy a seamless cafe journey crafted for speed and delight.</p>
            <div className="mt-6 flex gap-3">
              <a href="#menu" className="px-5 py-3 rounded-xl bg-amber-600 text-white font-semibold shadow hover:bg-amber-700">Order now</a>
              <a href="#services" className="px-5 py-3 rounded-xl bg-white border border-slate-200 font-semibold hover:bg-slate-50">Explore services</a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {heroStats.map((s, i) => (
                <div key={i} className="p-4 rounded-xl bg-white border border-slate-200">
                  <p className="text-xs uppercase tracking-widest text-slate-500">{s.label}</p>
                  <p className="text-2xl font-bold">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl bg-[url('https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center shadow-2xl" />
          </div>
        </div>
      </section>

      <MenuGrid onAdd={addToCart} />
      <Services />

      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="p-6 rounded-2xl bg-white border border-slate-200">
            <h3 className="text-xl font-semibold mb-2">About Bbrother Cafe</h3>
            <p className="text-slate-600">We blend craft coffee with modern technology to make every visit effortless. From mobile ordering to events and catering, we’re here to energize your day.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200">
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-slate-600">Open daily • Cozy interior • Fast Wi‑Fi • Friendly vibes</p>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-slate-500">© {new Date().getFullYear()} Bbrother Cafe. All rights reserved.</p>
      </section>

      {cartOpen && (
        <Cart items={cart} onClose={() => setCartOpen(false)} onCheckout={handleCheckout} />
      )}
    </div>
  )
}

export default App
