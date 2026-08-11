import React from 'react'
import { useState, useEffect } from 'react'
import { getAllShifts } from '../../services/shiftService'
import ShiftCard from './ShiftCard'

function ShiftList() {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    async function fetchShifts() {
        try{
            setLoading(true);
            const response = await getAllShifts();
            setShifts(response);
        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    }

  useEffect(() => {
    fetchShifts();
  }, []);

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
