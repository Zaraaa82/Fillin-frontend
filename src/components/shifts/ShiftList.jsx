import React from 'react'
import { useState, useEffect } from 'react'
import { getAllShifts, getShiftsByBusiness } from '../../services/shiftService'
import ShiftCard from './ShiftCard'

function ShiftList({ businessId }) {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    async function fetchShifts() {
        try{
            setLoading(true);
            const response = businessId ? await getShiftsByBusiness(businessId) : await getAllShifts();
            setShifts(response);
        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    }

  useEffect(() => {
    fetchShifts();
  }, [businessId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="shift-list">
      {shifts.map((shift) => (
        <ShiftCard key={shift._id} shift={shift} />
      ))}
    </div>
  )
}

export default ShiftList
