import { useEffect, useRef, useState } from 'react'

/**
 * useScrollReveal — fires once when element enters viewport.
 * Uses IntersectionObserver (GPU-composited, no scroll handler jank).
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      {
        threshold:   options.threshold   ?? 0.12,
        rootMargin:  options.rootMargin  ?? '0px 0px -60px 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return { ref, isVisible }
}

/**
 * useParallax — smooth parallax via rAF (144fps capable).
 */
export function useParallax(speed = 0.1) {
  const ref    = useRef(null)
  const [offset, setOffset] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (!ref.current) return
        const rect     = ref.current.getBoundingClientRect()
        const viewH    = window.innerHeight
        const progress = (viewH - rect.top) / (viewH + rect.height)
        setOffset((progress - 0.5) * speed * 200)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [speed])

  return { ref, style: { transform: `translateY(${offset}px)`, willChange: 'transform' } }
}

/**
 * useCountUp — animates a number from 0 → target when isVisible becomes true.
 * Uses rAF for silky animation.
 */
export function useCountUp(target, isVisible, duration = 1400) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!isVisible) return
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
      else setCount(target)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isVisible, target, duration])

  return count
}
