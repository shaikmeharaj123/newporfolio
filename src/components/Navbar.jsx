import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Experience', path: '/experience' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skills', path: '/skills' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 left-0 right-0 z-50 bg-[var(--color-void)]/92 backdrop-blur-xl border-b border-[var(--color-border)] py-3"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="font-display text-gold text-xl font-bold tracking-wide relative group"
        >
          SM
          <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `font-body text-sm tracking-widest uppercase transition-all duration-300 relative group ${
                    isActive ? 'text-gold' : 'text-mist hover:text-ice'
                  }`
                }
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </NavLink>
            </li>
          ))}
        </ul>

        <a
          href="mailto:shaikmeharajahmed2000@gmail.com"
          className="hidden md:inline-flex items-center gap-2 border border-gold/40 text-gold text-sm font-mono px-5 py-2 
            hover:bg-gold hover:text-void transition-all duration-300 rounded-sm"
        >
          Hire Me
        </a>

        <button
          className="md:hidden text-gold p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-gold transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-6 h-0.5 bg-gold mt-1.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-gold mt-1.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 pt-4 border-t border-[var(--color-border)] bg-[var(--color-ink)]/95 backdrop-blur-xl">
          {navLinks.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block w-full text-left py-3 font-body text-sm tracking-widest uppercase transition-colors ${
                  isActive ? 'text-gold' : 'text-mist hover:text-gold'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <a
            href="mailto:shaikmeharajahmed2000@gmail.com"
            className="mt-4 block text-center border border-gold/40 text-gold text-sm font-mono px-5 py-2 rounded-sm hover:bg-gold hover:text-void transition-all duration-300"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  )
}
