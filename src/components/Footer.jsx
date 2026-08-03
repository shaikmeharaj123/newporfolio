import { useData } from '../context/DataContext'

export default function Footer() {
  const { personalInfo } = useData()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-ink)] border-t border-[var(--color-border)] py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="font-display text-gold font-bold text-lg">SM</div>

        <div className="font-mono text-xs text-ghost text-center">
          © {year} Shaik Meharaj · Built with React + Vite + Tailwind
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${personalInfo.email}`}
            className="font-mono text-xs text-mist hover:text-gold transition-colors"
          >
            {personalInfo.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
