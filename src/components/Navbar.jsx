import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { House, Menu, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, setUser } = useAppContext()
  const navigate = useNavigate()
  const closeMenu = () => setMenuOpen(false)

  const signOut = () => {
    setUser(null)
    toast.success('You have been signed out.')
    navigate('/')
    closeMenu()
  }

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link className="brand" to="/" onClick={closeMenu} aria-label="Ranjith Estates home">
          <span className="brand-mark"><House size={17} /></span>
          <span>ranjith<small>ESTATES</small></span>
        </Link>
        <button className="mobile-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`nav-links ${menuOpen ? 'mobile-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/properties" onClick={closeMenu}>Properties</NavLink>
          <NavLink to="/agents/1" onClick={closeMenu}>Our agent</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          {user && <NavLink to="/saved" onClick={closeMenu}>Saved homes</NavLink>}
        </nav>
        <div className="nav-actions">
          {user ? (
            <>
              <span className="nav-login">Hi, {user.name.split(' ')[0]}</span>
              <button type="button" className="button nav-cta" onClick={signOut}>Sign out</button>
            </>
          ) : (
            <>
              <Link className="nav-login" to="/login">Log in</Link>
              <Link className="button nav-cta" to="/signup">Get started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
