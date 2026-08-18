import { useState } from 'react'
import { useData } from '../context/DataContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import contactAPI from '../api/contactAPI'

export default function Contact() {
  const { personalInfo } = useData()
  const { ref, isVisible } = useScrollReveal()
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState({ type: '', message: '' })
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setSubmitState({ type: '', message: '' })

    try {
      await contactAPI.sendContactMessage({
        name: form.name,
        email: form.email,
        subject: form.subject || `Portfolio enquiry from ${form.name || 'a visitor'}`,
        message: form.message,
        source: 'newportfolio website',
        page: window.location.pathname,
      })

      setSubmitState({
        type: 'success',
        message: 'Your message was sent successfully. I will get back to you soon.',
      })
      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      setSubmitState({
        type: 'error',
        message:
          error.response?.data?.message ||
          'Could not send your message right now. Please try email instead.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const contactItems = [
    {
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: 'Mail',
      action: copyEmail,
      actionLabel: copied ? 'Copied!' : 'Copy',
    },
    {
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      icon: 'Call',
    },
    {
      label: 'Location',
      value: personalInfo.location,
      icon: 'Map',
    },
  ]

  return (
    <section id="contact" className="bg-[var(--color-void)] py-10 px-6 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,168,76,0.04)_0%,transparent_70%)] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,168,76,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div
            className="font-mono text-xs text-gold tracking-widest uppercase mb-4"
            style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}
          >
            Get In Touch
          </div>

          <h2
            className="font-display text-5xl md:text-7xl font-black text-white mb-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s',
            }}
          >
            Let's Build
            <br />
            <span className="text-gradient-gold italic">Something</span>
          </h2>

          <p
            className="font-body text-mist text-lg max-w-xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.7s ease 0.2s',
            }}
          >
            Open to full-time roles, freelance projects, and interesting collaborations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {contactItems.map((item, i) => (
            <div
              key={item.label}
              className="border border-[var(--color-border)] bg-[var(--color-panel)] rounded-sm p-6 text-center hover:border-gold/30 transition-all duration-300 group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.6s ease ${200 + i * 100}ms, transform 0.6s ease ${200 + i * 100}ms`,
              }}
            >
              <div className="font-mono text-xs text-gold tracking-widest uppercase mb-3">{item.icon}</div>
              <div className="font-mono text-xs text-mist tracking-widest uppercase mb-2">{item.label}</div>
              {item.href ? (
                <a href={item.href} className="font-body text-sm text-ice hover:text-gold transition-colors break-all">
                  {item.value}
                </a>
              ) : (
                <div className="font-body text-sm text-ice">{item.value}</div>
              )}
              {item.action && (
                <button
                  onClick={item.action}
                  className="mt-3 font-mono text-xs text-gold/60 border border-gold/20 px-3 py-1 rounded-full hover:bg-gold/10 transition-all duration-200"
                >
                  {item.actionLabel}
                </button>
              )}
            </div>
          ))}
        </div>

        <div
          className="grid lg:grid-cols-[1fr_1.4fr] gap-5 items-stretch"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s ease 500ms, transform 0.6s ease 500ms',
          }}
        >
          <div className="border border-[var(--color-border)] bg-[var(--color-panel)] rounded-sm p-6">
            <div className="font-mono text-xs text-gold tracking-widest uppercase mb-4">Direct Email</div>
            <p className="font-body text-mist text-sm leading-relaxed mb-6">
              Use the form or open your mail app directly. The form prepares an email with your details.
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="group inline-flex items-center gap-4 bg-gold text-void font-mono font-bold text-sm px-8 py-4 rounded-sm hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_60px_rgba(201,168,76,0.5)]"
            >
              Start a Conversation
              <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
            </a>
            <a
              href={personalInfo.resumeDownloadUrl || personalInfo.resumeUrl}
              download
              className="mt-4 inline-flex items-center gap-4 border border-gold/40 text-gold font-mono font-bold text-sm px-8 py-4 rounded-sm hover:bg-gold hover:text-void transition-all duration-300"
            >
              Download Resume
            </a>
          </div>

          <form onSubmit={handleSubmit} className="border border-[var(--color-border)] bg-[var(--color-panel)] rounded-sm p-6 text-left">
            <div className="font-mono text-xs text-gold tracking-widest uppercase mb-5">Send A Message</div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <label className="block">
                <span className="font-mono text-xs text-mist tracking-widest uppercase">Name</span>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-2 w-full bg-[var(--color-void)] border border-[var(--color-border)] rounded-sm px-4 py-3 text-ice outline-none focus:border-gold transition-colors"
                  placeholder="Your name"
                />
              </label>

              <label className="block">
                <span className="font-mono text-xs text-mist tracking-widest uppercase">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-2 w-full bg-[var(--color-void)] border border-[var(--color-border)] rounded-sm px-4 py-3 text-ice outline-none focus:border-gold transition-colors"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="block mb-4">
              <span className="font-mono text-xs text-mist tracking-widest uppercase">Subject</span>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="mt-2 w-full bg-[var(--color-void)] border border-[var(--color-border)] rounded-sm px-4 py-3 text-ice outline-none focus:border-gold transition-colors"
                placeholder="Project inquiry, collaboration, or role..."
              />
            </label>

            <label className="block mb-5">
              <span className="font-mono text-xs text-mist tracking-widest uppercase">Message</span>
              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="mt-2 w-full resize-none bg-[var(--color-void)] border border-[var(--color-border)] rounded-sm px-4 py-3 text-ice outline-none focus:border-gold transition-colors"
                placeholder="Tell me about your project or role..."
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto bg-gold text-void font-mono font-bold text-sm px-8 py-4 rounded-sm hover:bg-gold-light transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitState.message && (
              <p
                className={`mt-4 text-sm font-medium ${submitState.type === 'success' ? 'text-green-400' : 'text-red-400'}`}
              >
                {submitState.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
