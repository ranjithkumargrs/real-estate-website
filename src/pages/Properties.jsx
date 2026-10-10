import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Search } from 'lucide-react'
import PropertyCard from '../components/PropertyCard'
import SearchFilter from '../components/SearchFilter'
import { properties } from '../data/properties'
import { useAppContext } from '../context/AppContext'

const emptyFilters = { location: '', type: '', category: '', bedrooms: '' }

function Properties({ savedOnly = false }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { savedIds } = useAppContext()
  const [filters, setFilters] = useState(() => ({
    location: searchParams.get('location') ?? '',
    type: searchParams.get('type') ?? '',
    category: searchParams.get('category') ?? '',
    bedrooms: searchParams.get('bedrooms') ?? '',
  }))

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      const matchesSaved = !savedOnly || savedIds.includes(property.id)
      const location = filters.location.trim().toLowerCase()
      const matchesLocation = !location || `${property.title} ${property.location} ${property.city}`.toLowerCase().includes(location)
      const matchesType = !filters.type || property.type === filters.type
      const matchesCategory = !filters.category || property.category === filters.category
      const matchesBedrooms = !filters.bedrooms || property.bedrooms >= Number(filters.bedrooms)
      return matchesSaved && matchesLocation && matchesType && matchesCategory && matchesBedrooms
    })
  }, [filters, savedIds, savedOnly])

  const applyFilters = (event) => {
    event.preventDefault()
    const params = {}
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params[key] = value
    })
    setSearchParams(params)
  }

  const resetFilters = () => {
    setFilters(emptyFilters)
    setSearchParams({})
  }

  return (
    <section className="container listing-section">
      <div className="listing-top">
        <span className="eyebrow">{savedOnly ? 'Your personal collection' : 'A place for every chapter'}</span>
        <h1 className="page-title">{savedOnly ? 'Saved homes' : 'Find your place'}</h1>
        <p className="section-copy">{savedOnly ? 'The homes you’ve had your eye on, all in one place.' : 'Explore homes picked with care across the Bay Area.'}</p>
      </div>
      {!savedOnly && <SearchFilter filters={filters} onChange={setFilters} onSubmit={applyFilters} onReset={resetFilters} />}
      {savedOnly && <div style={{ marginTop: 20 }}><Link className="breadcrumbs" to="/properties"><ArrowLeft size={13} /> Browse all homes</Link></div>}
      <div className="listing-result-line">
        <span><strong>{filtered.length}</strong> {filtered.length === 1 ? 'home' : 'homes'} {filters.location && `matching “${filters.location}”`}</span>
        {!savedOnly && <span>Curated by Ranjith</span>}
      </div>
      {filtered.length ? (
        <div className="property-grid">
          {filtered.map((property) => <PropertyCard key={property.id} property={property} />)}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={25} color="#1f5545" />
          <h3>{savedOnly ? 'No saved homes just yet' : 'No homes found'}</h3>
          <p>{savedOnly ? 'Tap the heart on any home to keep it here.' : 'Try a different location or clear a few filters.'}</p>
          {savedOnly
            ? <Link className="button" to="/properties">Explore homes</Link>
            : <button className="button" type="button" onClick={resetFilters}>Clear filters</button>}
        </div>
      )}
    </section>
  )
}

export default Properties
