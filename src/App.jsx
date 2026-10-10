import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AppContext } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetails from './pages/PropertyDetails'
import AgentDetails from './pages/AgentDetails'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Contact from './pages/Contact'
import './App.css'

function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ranjith-user')) ?? null
    } catch {
      return null
    }
  })
  const [savedIds, setSavedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ranjith-saved-homes')) ?? []
    } catch {
      return []
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem('ranjith-user', JSON.stringify(user))
    else localStorage.removeItem('ranjith-user')
  }, [user])

  useEffect(() => {
    localStorage.setItem('ranjith-saved-homes', JSON.stringify(savedIds))
  }, [savedIds])

  const toggleSaved = (id) => {
    setSavedIds((current) => current.includes(id)
      ? current.filter((savedId) => savedId !== id)
      : [...current, id])
  }

  return (
    <AppContext.Provider value={{ user, setUser, savedIds, toggleSaved }}>
      <BrowserRouter>
        <Toaster position="top-center" toastOptions={{ duration: 2800 }} />
        <div className="app-shell flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetails />} />
              <Route path="/agents/:id" element={<AgentDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/saved" element={<ProtectedRoute><Properties savedOnly /></ProtectedRoute>} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
