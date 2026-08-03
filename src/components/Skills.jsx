import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

const categoryColors = {
  Frontend: '#c9a84c',
  Backend: '#ff6b35',
  Database: '#4cc9c9',
  'UI/UX & Design': '#b48de8',
  Testing: '#4caf7d',
  'Soft Skills': '#a8c4e0',
}

function SkillCategory({ category, items, isVisible, delay }) {
  const color = categoryColors[category] || '#c9a84c'

  return (
    <div
      className="border border-[var(--color-border)] bg-[var(--color-panel)] rounded-sm p-6 hover:border-opacity-50 transition-all duration-300 group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color }}>
          {category}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((skill, i) => (
          <span
            key={skill}
            className="font-mono text-xs px-3 py-1.5 border rounded-sm transition-all duration-200 hover:scale-105"
            style={{
              color: color + 'cc',
              borderColor: color + '30',
              background: color + '08',
              transitionDelay: `${i * 30}ms`,
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills({ preview = false, limit = 3 }) {
  const { deployment, education, skills } = useData()
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 })
  const { ref: eduRef, isVisible: eduVisible } = useScrollReveal()
  const visibleSkills = Object.entries(skills).slice(0, preview ? limit : Object.keys(skills).length)

  return (
    <>
      <section id="skills" className="bg-[var(--color-void)] py-10 px-6" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div
              className="font-mono text-xs text-gold tracking-widest uppercase mb-4"
              style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}
            >
              Technical Arsenal
            </div>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2
                className="font-display text-5xl md:text-6xl font-black text-white"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
                }}
              >
                Skills &
                <br />
                <span className="text-gradient-gold italic">Technologies</span>
              </h2>

              {preview && (
                <Link
                  to="/skills"
                  className="font-mono text-xs px-4 py-2 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-void transition-all duration-300"
                >
                  View All Skills
                </Link>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {visibleSkills.map(([category, items], i) => (
              <SkillCategory
                key={category}
                category={category}
                items={items}
                isVisible={isVisible}
                delay={150 + i * 100}
              />
            ))}
          </div>

          {!preview && (
            <div
              className="border border-[var(--color-border)] bg-[var(--color-panel)] rounded-sm p-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.6s ease 700ms, transform 0.6s ease 700ms',
              }}
            >
              <div className="font-mono text-xs text-gold tracking-widest uppercase mb-6">
                Deployment & Hosting Platforms
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {deployment.map((item) => (
                  <div
                    key={item.platform}
                    className="flex items-center gap-3 border border-[var(--color-border)] rounded-sm px-4 py-3 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="font-body text-sm font-medium text-ice">{item.platform}</div>
                      <div className="font-mono text-xs text-mist">{item.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {!preview && (
        <section className="bg-[var(--color-ink)] py-20 px-6" ref={eduRef}>
          <div className="max-w-4xl mx-auto">
            <div
              className="font-mono text-xs text-gold tracking-widest uppercase mb-8"
              style={{ opacity: eduVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}
            >
              Education
            </div>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div
                  key={edu.degree}
                  className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4 last:border-0"
                  style={{
                    opacity: eduVisible ? 1 : 0,
                    transform: eduVisible ? 'translateX(0)' : 'translateX(-30px)',
                    transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms`,
                  }}
                >
                  <div>
                    <div className="font-body font-semibold text-ice">{edu.degree}</div>
                    <div className="font-body text-sm text-mist mt-0.5">{edu.institution}</div>
                  </div>
                  <span className="font-mono text-xs text-gold/60 border border-gold/20 px-3 py-1 rounded-full">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
