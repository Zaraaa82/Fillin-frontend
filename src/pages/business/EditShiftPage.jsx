import React from 'react'
import { useParams } from 'react-router'
import ShiftForm from '../../components/shifts/ShiftForm'

function EditShiftPage() {
  const { shiftId } = useParams();
  return (
    <div className='page-container'>
      <ShiftForm shiftId={shiftId} />
    </div>
  )
}

export default EditShiftPage
