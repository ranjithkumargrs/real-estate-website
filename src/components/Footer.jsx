import { Link } from 'react-router-dom'
import { House } from 'lucide-react'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link className="brand" to="/">
              <span className="brand-mark"><House size={17} /></span>
              <span>ranjith<small>ESTATES</small></span>
            </Link>
            <p>A more thoughtful way to find your place. Local expertise, personal guidance, and homes worth coming home to.</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/properties">All properties</Link>
            <Link to="/properties?type=For+rent">Homes for rent</Link>
            <Link to="/agents/1">Meet Ranjith</Link>
          </div>
          <div className="footer-col">
            <h4>Get in touch</h4>
            <Link to="/contact">Contact us</Link>
            <a href="mailto:hello@ranjithestates.com">hello@ranjithestates.com</a>
            <a href="tel:+14155550138">+1 (415) 555-0138</a>
          </div>
          <div className="footer-col">
            <h4>Office</h4>
            <p>2168 Market Street<br />San Francisco, CA 94114</p>
            <p>Mon – Sat, 9am – 6pm</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Ranjith Estates. All rights reserved.</span>
          <span>Thoughtfully finding your place.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
