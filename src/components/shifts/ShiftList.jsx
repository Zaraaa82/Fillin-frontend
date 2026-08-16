import React from 'react'
import { useState, useEffect } from 'react'
import { getAllShifts, getShiftsByBusiness } from '../../services/shiftService'
import ShiftCard from './ShiftCard'
import ShiftFilters from './ShiftFilters';
import { Flex, Spin } from 'antd';

function ShiftList({ businessId }) {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState('');
  const [delayedSearch, setDelayedSearch] = useState('');

  useEffect(()=>{
    const timeout = setTimeout(()=> {setDelayedSearch(search)}, 300);
    return () => clearTimeout(timeout);
  },[search]);

  const filteredShifts = shifts.filter((shift) =>
    shift.title.toLowerCase().includes(delayedSearch.toLowerCase())
  )


  async function fetchShifts() {
      try{
          setLoading(true);
          setError("");
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
    return(
      <Flex justify="center" align="center" style={{ height: '50vh' }}>
        <Spin size="large" style={{color: '#14b8a6'}}/>
      </Flex>
    )
  }

  if (!shifts.length) {
    return <p>No shifts found.</p>;
  }

  return (
    <>
      <ShiftFilters search={search} setSearch={setSearch} />
      <div className="shift-list">
        {
          filteredShifts.length > 0 ?
          (
            filteredShifts.map((shift) => (
              <ShiftCard key={shift._id} shift={shift} />
            ))
            
          )
          :
          <p className='empty-state'>No shifts match your search.</p>
        }
      </div>
    </>
  )
}

export default ShiftList
