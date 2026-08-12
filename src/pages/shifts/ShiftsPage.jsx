import React from 'react'
import ShiftList from '../../components/shifts/ShiftList'
import ShiftFilters from '../../components/shifts/ShiftFilters'

function ShiftsPage() {
  return (
    <div className='page-container'>
      <h1 className='page-title'>Shifts</h1>
      <ShiftFilters />
      <ShiftList />
    </div>
  )
}

export default ShiftsPage
