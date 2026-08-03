import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import About from '../components/About'
import Blog from '../components/Blog'
import Contact from '../components/Contact'
import Experience from '../components/Experience'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Skills from '../components/Skills'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
}

function AnimatedSection({ children }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.2,
    margin: "-50px"
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      {children}
    </motion.div>
  )
}

export default function PortfolioPage() {
  return (
    <main>
      <Hero />
      
      <AnimatedSection>
        <About />
      </AnimatedSection>
      
      <AnimatedSection>
        <Experience preview />
      </AnimatedSection>
      
      <AnimatedSection>
        <Projects preview limit={3} />
      </AnimatedSection>
      
      <AnimatedSection>
        <Skills preview limit={6} />
      </AnimatedSection>
      
      <AnimatedSection>
        <Blog preview />
      </AnimatedSection>
      
      <AnimatedSection>
        <Contact />
      </AnimatedSection>
    </main>
  )
}