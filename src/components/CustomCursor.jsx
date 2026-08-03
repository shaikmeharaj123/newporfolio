import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const rafRef  = useRef(null)

  useEffect(() => {
    const dot    = dotRef.current
    const ringEl = ringRef.current

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      // Dot = instant (feels snappy)
      if (dot) {
        dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const onEnter = () => ringEl?.classList.add('hovered')
    const onLeave = () => ringEl?.classList.remove('hovered')

    // Ring = smooth lerp at native rAF (144fps capable)
    const lerp = (a, b, t) => a + (b - a) * t
    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.13)
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.13)
      if (ringEl) {
        const s = ringEl.classList.contains('hovered') ? 30 : 18
        ringEl.style.transform = `translate(${ring.current.x - s}px, ${ring.current.y - s}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Delegate hover detection using event delegation — works for dynamic elements
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, [data-hover]')) onEnter()
      else onLeave()
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ transform: 'translate(-100px, -100px)', transition: 'background 0.3s ease' }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ transform: 'translate(-100px, -100px)' }}
      />
    </>
  )
}
