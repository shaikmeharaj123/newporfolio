import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

function BlogCard({ post, index, isVisible }) {
  const delay = index * 100

  return (
    <article
      className="border border-[var(--color-border)] bg-[var(--color-panel)] rounded-sm p-6 hover:border-gold/40 transition-all duration-300 group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="font-mono text-xs text-gold border border-gold/20 px-2 py-1 rounded-full">
          {post.category}
        </span>
        <span className="font-mono text-xs text-mist">{post.date}</span>
        <span className="font-mono text-xs text-ghost">/</span>
        <span className="font-mono text-xs text-mist">{post.readTime}</span>
      </div>

      <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-gold transition-colors">
        {post.title}
      </h3>
      <p className="font-body text-sm text-mist leading-relaxed mb-5">{post.excerpt}</p>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="font-mono text-xs text-mist/70 bg-[var(--color-void)] border border-[var(--color-border)] px-2 py-1 rounded-sm">
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}

export default function Blog({ preview = false, limit = 2 }) {
  const { blogs } = useData()
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 })
  const visibleBlogs = preview ? blogs.slice(0, limit) : blogs

  return (
    <section id="blog" className="bg-[var(--color-ink)] py-10 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <div
              className="font-mono text-xs text-gold tracking-widest uppercase mb-4"
              style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}
            >
              Blog
            </div>
            <h2
              className="font-display text-5xl md:text-6xl font-black text-white"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
              }}
            >
              Notes From
              <br />
              <span className="text-gradient-gold italic">Building</span>
            </h2>
          </div>

          {preview && (
            <Link
              to="/blog"
              className="font-mono text-xs px-4 py-2 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-void transition-all duration-300"
            >
              View All Blogs
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleBlogs.map((post, index) => (
            <BlogCard key={post.title} post={post} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}
