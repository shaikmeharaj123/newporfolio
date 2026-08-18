import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import AppShell from './components/AppShell'
import About from './components/About'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Projects from './components/Projects'
import SeoManager from './components/SeoManager'
import ScrollToTop from './components/ScrollToTop'
import Skills from './components/Skills'
import useSmoothAnchorScroll from './hooks/useSmoothAnchorScroll'
import PortfolioPage from './pages/PortfolioPage'

export default function App() {
  useSmoothAnchorScroll()

  return (
    <BrowserRouter>
      <DataProvider>
        <ScrollToTop />
        <SeoManager />
        <AppShell>
          <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AppShell>
      </DataProvider>
    </BrowserRouter>
  )
}
