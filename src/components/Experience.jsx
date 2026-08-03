import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

function TimelineCard({ item, index, isVisible, isLeft }) {
  const delay = index * 150

  return (
    <div
      className={`relative flex items-center w-full mb-12 md:mb-16 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateX(0)'
          : isLeft
          ? 'translateX(-50px)'
          : 'translateX(50px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {/* Card */}
      <div
        className={`group relative w-full md:w-[calc(50%-2rem)] border border-[var(--color-border)] bg-[var(--color-panel)] rounded-sm p-6 md:p-8 hover:border-gold/50 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-gold/5 ${
          isLeft ? 'md:mr-auto' : 'md:ml-auto'
        }`}
      >
        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Role */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white group-hover:text-gold transition-colors duration-300">
            {item.role}
          </h3>
          {item.current && (
            <span className="font-mono text-xs bg-gold/10 text-gold border border-gold/30 px-3 py-1 rounded-full whitespace-nowrap">
              Current
            </span>
          )}
        </div>

        {/* Company / Location */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-mist mb-4">
          <span className="font-body font-semibold text-ice">{item.company}</span>
          <span className="hidden sm:inline text-ghost">·</span>
          <span className="font-body text-sm">{item.location}</span>
        </div>

        {/* Period badge */}
        <div className="inline-flex items-center mb-5 font-mono text-xs text-gold/80 bg-gold/5 border border-gold/20 px-3 py-1 rounded-full">
          {item.period}
        </div>

        {/* Highlights */}
        <ul className="space-y-3">
          {item.highlights.map((point, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-gold mt-1 flex-shrink-0 text-xs">▹</span>
              <span className="font-body text-mist text-sm leading-relaxed">
                {point}
              </span>
            </li>
          ))}
        </ul>

        {/* Arrow pointer for desktop – points toward the center line */}
        <div
          className={`hidden md:block absolute top-8 w-4 h-4 rotate-45 border border-[var(--color-border)] bg-[var(--color-panel)] ${
            isLeft
              ? '-right-2 border-l-0 border-b-0'
              : '-left-2 border-r-0 border-t-0'
          }`}
        />
      </div>

      {/* Center dot on the timeline */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
        <div
          className={`w-4 h-4 rounded-full border-2 ${
            item.current
              ? 'border-gold bg-gold animate-pulse'
              : 'border-mist bg-[var(--color-void)]'
          } ring-4 ring-[var(--color-void)]`}
        />
      </div>
    </div>
  )
}

export default function Experience({ preview = false, limit = 1 }) {
  const { experience } = useData()
  const { ref, isVisible } = useScrollReveal()
  const visibleExperience = preview ? experience.slice(0, limit) : experience

  return (
    <section id="experience" className="bg-[var(--color-void)] py-10 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="font-mono text-xs text-gold tracking-widest uppercase mb-3"
            style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}
          >
            Work Experience
          </div>
          <h2
            className="font-display text-5xl md:text-6xl font-black text-white"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}
          >
            The Journey
            <span className="text-gradient-gold italic"> So Far</span>
          </h2>
          {preview && (
            <Link
              to="/experience"
              className="inline-block mt-8 font-mono text-xs px-5 py-2.5 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-void transition-all duration-300"
            >
              Full Timeline →
            </Link>
          )}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line – mobile: left side, desktop: center */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-gold/30 via-[var(--color-border)] to-transparent" />

          {visibleExperience.map((item, i) => (
            <TimelineCard
              key={item.company}
              item={item}
              index={i}
              isVisible={isVisible}
              isLeft={i % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
