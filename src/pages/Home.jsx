import { useState } from 'react'
import { ArrowRight, Check, MapPin, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import { properties } from '../data/properties'

function Home() {
  const [location, setLocation] = useState('')
  const [type, setType] = useState('For sale')
  const [category, setCategory] = useState('')
  const navigate = useNavigate()

  const searchHomes = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()
    if (location.trim()) params.set('location', location.trim())
    if (type) params.set('type', type)
    if (category) params.set('category', category)
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <>
      <section className="hero-section">
        <div className="hero-background" />
        <div className="container hero-content">
          <div className="hero-kicker">A little closer to home</div>
          <h1>Find a place<br />to <em>belong.</em></h1>
          <p>Thoughtfully chosen homes, and a local expert who makes finding yours feel a little more like you.</p>
          <form className="hero-search" onSubmit={searchHomes}>
            <label className="field">
              <span>Where do you want to live?</span>
              <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="City or neighborhood" />
            </label>
            <label className="field">
              <span>I'm looking to</span>
              <select value={type} onChange={(event) => setType(event.target.value)}>
                <option>For sale</option>
                <option>For rent</option>
              </select>
            </label>
            <label className="field">
              <span>Property type</span>
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option value="">Any type</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Condo</option>
              </select>
            </label>
            <button className="button" type="submit"><Search size={16} /> Find a home</button>
          </form>
          <div className="hero-note">
            <span><Check size={13} /> Local knowledge</span>
            <span><Check size={13} /> Personal guidance</span>
            <span><Check size={13} /> No pressure, ever</span>
          </div>
        </div>
      </section>

      <section className="stats-strip" aria-label="Ranjith Estates at a glance">
        <div className="container stats-inner">
          <div className="stat-item"><strong>12+</strong><span>Years in the neighborhood</span></div>
          <div className="stat-item"><strong>240+</strong><span>Happy home stories</span></div>
          <div className="stat-item"><strong>$180M</strong><span>In homes thoughtfully sold</span></div>
          <div className="stat-item"><strong>4.9 / 5</strong><span>Client experience rating</span></div>
        </div>
      </section>

      <section className="container featured-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A few good places</span>
            <h2>Featured homes</h2>
            <p className="section-copy">A thoughtful edit of homes we think you’ll love.</p>
          </div>
          <Link className="button button-outline" to="/properties">Explore all homes <ArrowRight size={15} /></Link>
        </div>
        <div className="property-grid">
          {properties.slice(0, 3).map((property) => <PropertyCard key={property.id} property={property} />)}
        </div>
      </section>

      <section className="home-about">
        <div className="container about-inner">
          <div className="about-photo">
            <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&q=85" alt="Warm, light-filled living room in a thoughtfully designed home" loading="lazy" />
            <div className="about-badge"><strong>People first.</strong><span>Always has been. Always will be.</span></div>
          </div>
          <div className="about-text">
            <span className="eyebrow">A different kind of real estate</span>
            <h2>It’s not just a house.<br />It’s your next chapter.</h2>
            <p>Buying or selling a home is personal. Ranjith takes the time to understand what matters to you, shares honest local insight, and stays by your side from the first conversation to the moment you turn the key.</p>
            <Link className="button" to="/agents/1">Meet Ranjith <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="home-cta">
          <div>
            <span className="eyebrow" style={{ color: '#cadbce' }}>Your next chapter starts here</span>
            <h2>Let’s find your place.</h2>
            <p>Tell us what home looks like for you. We’ll take it from there.</p>
          </div>
          <Link className="button" to="/contact"><MapPin size={15} /> Start a conversation <ArrowRight size={15} /></Link>
        </div>
      </section>
    </>
  )
}

export default Home
