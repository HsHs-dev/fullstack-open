const Filter = ({search, handleSearchChange}) => (
  <label className="search-field">
    Search contacts
    <input type="search" placeholder="Search by name…" value={search} onChange={handleSearchChange} />
  </label>
)

export default Filter
