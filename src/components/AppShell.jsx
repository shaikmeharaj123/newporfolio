import CustomCursor from './CustomCursor'
import Footer from './Footer'
import Navbar from './Navbar'
import ThemeSwitcher from './ThemeSwitcher'

export default function AppShell({ children }) {
  return (
    <div className="relative">
      <CustomCursor />
      <ThemeSwitcher />
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
