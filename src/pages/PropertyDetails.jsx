import { useState } from 'react'
import { ArrowLeft, Bath, BedDouble, Check, Heart, MapPin, MoveUpRight, Share2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { agents, formatPrice, properties } from '../data/properties'
import { useAppContext } from '../context/AppContext'

function PropertyDetails() {
  const { id } = useParams()
  const property = properties.find((item) => item.id === id)
  const agent = agents.find((item) => item.id === property?.agentId)
  const { savedIds, toggleSaved } = useAppContext()
  const navigate = useNavigate()
  const [inquirySent, setInquirySent] = useState(false)

  if (!property) {
    return (
      <div className="container empty-state" style={{ marginTop: 60 }}>
        <h3>We couldn’t find that home</h3>
        <p>It may have been removed or the link may be out of date.</p>
        <Link className="button" to="/properties">Browse homes</Link>
      </div>
    )
  }

  const isSaved = savedIds.includes(property.id)
  const shareHome = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Property link copied.')
    } catch {
      toast.error('Could not copy the link. Please copy the page address.')
    }
  }
  const submitInquiry = (event) => {
    event.preventDefault()
    setInquirySent(true)
    toast.success('Thanks! Ranjith will be in touch shortly.')
  }

  return (
    <div className="container detail-page">
      <Link className="breadcrumbs" to="/properties"><ArrowLeft size={13} /> Back to properties</Link>
      <div className="detail-head">
        <div>
          <span className="eyebrow">{property.type} · {property.category}</span>
          <h1>{property.title}</h1>
          <div className="card-location"><MapPin size={14} />{property.location}</div>
        </div>
        <div className="detail-actions">
          <button className={`icon-button ${isSaved ? 'is-saved' : ''}`} type="button" aria-label={isSaved ? 'Remove from saved homes' : 'Save home'} onClick={() => {
            toggleSaved(property.id)
            toast.success(isSaved ? 'Removed from saved homes.' : 'Added to saved homes.')
          }}><Heart size={17} fill={isSaved ? 'currentColor' : 'none'} /></button>
          <button className="icon-button" type="button" aria-label="Share property" onClick={shareHome}><Share2 size={16} /></button>
        </div>
      </div>
      <div className="detail-gallery">
        {property.gallery.map((image, index) => <img key={image} src={image} alt={`${property.title} view ${index + 1}`} />)}
      </div>
      <div className="detail-content">
        <div className="detail-main">
          <section>
            <div className="detail-stats">
              <div className="detail-stat"><BedDouble size={19} /><div><strong>{property.bedrooms}</strong><span>Bedrooms</span></div></div>
              <div className="detail-stat"><Bath size={19} /><div><strong>{property.bathrooms}</strong><span>Bathrooms</span></div></div>
              <div className="detail-stat"><MoveUpRight size={18} /><div><strong>{property.area.toLocaleString()}</strong><span>Square feet</span></div></div>
            </div>
          </section>
          <section>
            <h2>A home with a story</h2>
            <p>{property.description}</p>
          </section>
          <section>
            <h2>The thoughtful details</h2>
            <div className="amenity-grid">
              {property.features.map((feature) => <span key={feature}><Check size={14} color="#1f5545" />{feature}</span>)}
            </div>
          </section>
          <section>
            <h2>Meet your agent</h2>
            <div className="agent-mini">
              <img src={agent.photo} alt={agent.name} />
              <div><strong>{agent.name}</strong><span>{agent.title}</span></div>
              <Link className="button button-outline" style={{ marginLeft: 'auto', minHeight: 38, padding: '0 12px' }} to={`/agents/${agent.id}`}>View profile</Link>
            </div>
          </section>
        </div>
        <aside className="inquiry-card">
          <div className="detail-price">{formatPrice(property.price, property.type)}</div>
          <p>Interested in making this your place?</p>
          {inquirySent ? (
            <div className="empty-state" style={{ padding: '22px 10px' }}><Check size={22} color="#1f5545" /><h3 style={{ fontSize: 20 }}>You’re on the list</h3><p>Ranjith will be in touch shortly.</p></div>
          ) : (
            <form className="form-stack" onSubmit={submitInquiry}>
              <label className="field"><span>Your name</span><input name="name" required placeholder="Jane Smith" /></label>
              <label className="field"><span>Email address</span><input name="email" type="email" required placeholder="jane@email.com" /></label>
              <label className="field"><span>Message</span><textarea name="message" required defaultValue={`I'm interested in ${property.title}.`} /></label>
              <button className="button" type="submit">Request a viewing</button>
            </form>
          )}
          <div className="agent-mini">
            <img src={agent.photo} alt="" />
            <div><strong>{agent.name}</strong><span>Local expert, here to help</span></div>
          </div>
          <button className="button button-outline" style={{ width: '100%', marginTop: 12 }} type="button" onClick={() => navigate(`/agents/${agent.id}`)}>Ask Ranjith a question</button>
        </aside>
      </div>
    </div>
  )
}

export default PropertyDetails
