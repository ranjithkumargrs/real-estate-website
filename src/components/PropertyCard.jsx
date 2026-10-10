import { BedDouble, Heart, MapPin, MoveUpRight, ShowerHead } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { formatPrice } from '../data/properties'
import { useAppContext } from '../context/AppContext'

function PropertyCard({ property }) {
  const { savedIds, toggleSaved } = useAppContext()
  const isSaved = savedIds.includes(property.id)

  const handleSave = () => {
    toggleSaved(property.id)
    toast.success(isSaved ? 'Removed from saved homes.' : 'Added to saved homes.')
  }

  return (
    <article className="property-card">
      <div className="card-image-wrap">
        <Link to={`/properties/${property.id}`} aria-label={`View ${property.title}`}>
          <img src={property.image} alt={property.title} loading="lazy" />
        </Link>
        <span className="card-tag">{property.type}</span>
        <button className={`icon-button ${isSaved ? 'is-saved' : ''}`} type="button" onClick={handleSave} aria-label={isSaved ? 'Remove from saved homes' : 'Save home'}>
          <Heart size={17} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="card-body">
        <div className="card-price">
          <strong>{formatPrice(property.price, property.type)}</strong>
          <span>{property.category}</span>
        </div>
        <h3><Link to={`/properties/${property.id}`}>{property.title}</Link></h3>
        <div className="card-location"><MapPin size={13} />{property.location}</div>
        <div className="card-features">
          <span><BedDouble size={14} />{property.bedrooms} beds</span>
          <span><ShowerHead size={14} />{property.bathrooms} baths</span>
          <span><MoveUpRight size={13} />{property.area.toLocaleString()} sqft</span>
        </div>
      </div>
    </article>
  )
}

export default PropertyCard
