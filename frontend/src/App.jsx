import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminLogin from './components/admin/AdminLogin'
import AdminPanel from './components/admin/AdminPanel'
import { useScrollAnimation } from './hooks/useScrollAnimation'

function Portfolio() {
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)

  useScrollAnimation()

  const handleLoadComplete = () => {
    setLoading(false)
    setTimeout(() => setVisible(true), 50)
  }

  return (
    <>
      <div className="noise-overlay" />
      <Cursor />
      {loading && <Loader onComplete={handleLoadComplete} />}
      <div className={`transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/panel" element={<AdminPanel />} />
      </Routes>
    </Router>
  )
}

export default App
