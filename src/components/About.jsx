import { useScrollReveal, useCountUp } from '../hooks/useScrollReveal'

function StatCard({ value, suffix = '', label, isVisible, delay }) {
  const count = useCountUp(value, isVisible)
  return (
    <div
      className="border border-[var(--color-border)] bg-[var(--color-panel)] p-6 rounded-sm hover:border-gold/40 transition-all duration-300 group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <div className="font-display text-4xl font-bold text-gold group-hover:text-gold-light transition-colors">
        {count}{suffix}
      </div>
      <div className="font-mono text-xs text-mist tracking-widest uppercase mt-2">{label}</div>
    </div>
  )
}

export default function About() {
  const { ref, isVisible } = useScrollReveal()

  const stats = [
    { value: 2, suffix: '.5+ yrs', label: 'Experience' },
    { value: 7, suffix: '+', label: 'Products Built' },
    { value: 5, suffix: '', label: 'Tech Domains' },
    { value: 15, suffix: '+', label: 'Tech Skills' },
  ]

  return (
    <section id="about" className="bg-[var(--color-ink)] py-10 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div
              className="font-mono text-xs text-gold tracking-widest uppercase mb-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
              }}
            >
              ── About Me
            </div>

            <h2
              className="font-display text-5xl md:text-6xl font-black text-white mb-6 leading-none"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s',
              }}
            >
              Crafting Digital
              <br />
              <span className="text-gradient-gold italic">Experiences</span>
            </h2>

            <p
              className="font-body text-mist text-lg leading-relaxed mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
              }}
            >
              I'm a MERN Stack Developer and UI/UX Designer based in Bangalore, India. I bridge the gap between 
              design and engineering — handling everything from client requirement gathering and Figma wireframes
              to production-grade code and Play Store deployments.
            </p>

            <p
              className="font-body text-mist text-lg leading-relaxed mb-10"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
              }}
            >
              Currently at <span className="text-gold">Dexterous Technology</span>, I've shipped products across 
              ride-sharing, grocery delivery, e-commerce, fintech, and healthcare domains — always with a focus 
              on pixel-perfect UI and performant architecture.
            </p>

            {/* Tags */}
            <div
              className="flex flex-wrap gap-2"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.7s ease 0.4s',
              }}
            >
              {['Hyderabad → Bangalore', 'Full Product Cycles', 'React Native & Web', 'Figma to Code'].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs border border-gold/20 text-gold/70 px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right – Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <StatCard
                key={s.label}
                {...s}
                isVisible={isVisible}
                delay={200 + i * 100}
              />
            ))}

            {/* Location card */}
            <div
              className="col-span-2 border border-[var(--color-border)] bg-[var(--color-panel)] p-6 rounded-sm relative overflow-hidden"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.6s ease 600ms, transform 0.6s ease 600ms',
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_80%_50%,rgba(201,168,76,0.05)_0%,transparent_70%)]" />
              <div className="relative z-10">
                <div className="font-mono text-xs text-mist tracking-widest uppercase mb-1">📍 Current Location</div>
                <div className="font-display text-xl font-bold text-ice">HSR Layout, Bangalore</div>
                <div className="font-body text-sm text-mist mt-1">Open to remote & on-site opportunities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
