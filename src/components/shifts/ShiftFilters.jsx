import React from 'react'
import { Search } from 'lucide-react'

function ShiftFilters({ search, setSearch }) {
  return (
    <div className='shift-filters'>
      <Search size={18} />

      <input
        className='form-input'
        type='search'
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder='Search shifts'
      />
    </div>
  )
}

export default ShiftFilters