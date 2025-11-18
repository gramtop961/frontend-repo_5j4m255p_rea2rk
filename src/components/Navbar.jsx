import { Coffee, Menu as MenuIcon, ShoppingCart } from 'lucide-react'

export default function Navbar({ onCartOpen }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow">
            <Coffee size={20} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500">Bbrother</p>
            <h1 className="text-lg font-bold tracking-tight">Cafe</h1>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-slate-700">
          <a href="#menu" className="hover:text-amber-600 flex items-center gap-2"><MenuIcon size={18}/> Menu</a>
          <a href="#services" className="hover:text-amber-600">Services</a>
          <a href="#about" className="hover:text-amber-600">About</a>
        </nav>
        <button onClick={onCartOpen} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 shadow">
          <ShoppingCart size={18} /> Cart
        </button>
      </div>
    </header>
  )
}
