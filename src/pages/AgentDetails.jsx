import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import { agents, properties } from '../data/properties'

function AgentDetails() {
  const { id } = useParams()
  const agent = agents.find((item) => item.id === id)
  const listings = properties.filter((property) => property.agentId === id).slice(0, 3)

  if (!agent) {
    return <div className="container empty-state" style={{ marginTop: 60 }}><h3>Agent not found</h3><p>Explore our available homes instead.</p><Link className="button" to="/properties">Browse homes</Link></div>
  }

  return (
    <>
      <section className="agent-hero">
        <div className="container agent-profile">
          <img src={agent.photo} alt={agent.name} />
          <div className="agent-copy">
            <span className="eyebrow">A good guide makes all the difference</span>
            <h1>{agent.name}</h1>
            <span className="role">{agent.title}</span>
            <p>{agent.bio}</p>
            <div className="agent-meta">
              <span><MapPin size={14} /> San Francisco Bay Area</span>
              <span>{agent.experience} experience</span>
            </div>
            <Link className="button" to="/contact">Let’s talk <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>
      <section className="container featured-section">
        <div className="section-heading">
          <div><span className="eyebrow">A few places Ranjith loves</span><h2>Current listings</h2></div>
          <Link className="button button-outline" to="/properties">All homes <ArrowRight size={15} /></Link>
        </div>
        <div className="property-grid">
          {listings.map((property) => <PropertyCard key={property.id} property={property} />)}
        </div>
        <div className="agent-meta" style={{ marginTop: 30 }}>
          <a href={`mailto:${agent.email}`}><Mail size={14} />{agent.email}</a>
          <a href={`tel:${agent.phone.replace(/[^\d+]/g, '')}`}><Phone size={14} />{agent.phone}</a>
        </div>
      </section>
    </>
  )
}

export default AgentDetails
