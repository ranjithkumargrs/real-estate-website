import { Search, SlidersHorizontal } from 'lucide-react'

function SearchFilter({ filters, onChange, onSubmit, onReset }) {
  const update = (key) => (event) => onChange({ ...filters, [key]: event.target.value })

  return (
    <form className="filter-panel" onSubmit={onSubmit}>
      <label className="field">
        <span>Location or keyword</span>
        <input value={filters.location} onChange={update('location')} placeholder="City, neighborhood..." />
      </label>
      <label className="field">
        <span>Listing type</span>
        <select value={filters.type} onChange={update('type')}>
          <option value="">Buy or rent</option>
          <option>For sale</option>
          <option>For rent</option>
        </select>
      </label>
      <label className="field">
        <span>Property type</span>
        <select value={filters.category} onChange={update('category')}>
          <option value="">Any property</option>
          <option>House</option>
          <option>Apartment</option>
          <option>Condo</option>
        </select>
      </label>
      <label className="field">
        <span>Bedrooms</span>
        <select value={filters.bedrooms} onChange={update('bedrooms')}>
          <option value="">Any beds</option>
          <option value="1">1+ beds</option>
          <option value="2">2+ beds</option>
          <option value="3">3+ beds</option>
          <option value="4">4+ beds</option>
        </select>
      </label>
      <div className="filter-actions">
        <button className="button" type="submit"><Search size={15} /> Search homes</button>
        <button className="filter-reset" type="button" onClick={onReset}><SlidersHorizontal size={13} /> Reset</button>
      </div>
    </form>
  )
}

export default SearchFilter
