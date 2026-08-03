import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'

export default function HomeOverview() {
  const { experience, personalInfo, projects, skills } = useData()
  const overviewCards = [
    {
      title: 'About',
      path: '/about',
      label: personalInfo.location,
      body: personalInfo.summary,
    },
    {
      title: 'Experience',
      path: '/experience',
      label: experience[0]?.period,
      body: experience[0] ? `${experience[0].role} at ${experience[0].company}` : '',
    },
    {
      title: 'Projects',
      path: '/projects',
      label: `${projects.length}+ shipped products`,
      body: projects.slice(0, 3).map((project) => project.name).join(', '),
    },
    {
      title: 'Skills',
      path: '/skills',
      label: `${Object.values(skills).flat().length}+ tools`,
      body: Object.keys(skills).slice(0, 4).join(', '),
    },
  ]
  return (
    <section className="bg-[var(--color-ink)] px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <div className="font-mono text-xs text-gold tracking-widest uppercase mb-3">Portfolio Overview</div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white">
              Quick Look,
              <br />
              <span className="text-gradient-gold italic">Full Pages Inside</span>
            </h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 border border-gold/40 text-gold font-mono text-sm px-5 py-3 rounded-sm hover:bg-gold hover:text-void transition-all duration-300"
          >
            Contact Me
            <span>-&gt;</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewCards.map((card) => (
            <Link
              key={card.path}
              to={card.path}
              className="group border border-[var(--color-border)] bg-[var(--color-panel)] rounded-sm p-6 hover:border-gold/40 transition-all duration-300"
            >
              <div className="font-mono text-xs text-gold/70 tracking-widest uppercase mb-3">{card.label}</div>
              <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-gold transition-colors">
                {card.title}
              </h3>
              <p className="font-body text-sm text-mist leading-relaxed line-clamp-4">{card.body}</p>
              <div className="font-mono text-xs text-gold mt-5">View details -&gt;</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
