import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { createShift, updateShift, getShiftById } from '../../services/shiftService'
import { getSkills } from '../../services/skillService'

function toDateInputValue(dateString) {
    if (!dateString) return '';
    return new Date(dateString).toISOString().slice(0, 10);
}

function toDateTimeInputValue(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
}

function ShiftForm({ shiftId }) {
    const navigate = useNavigate();
    const isEditMode = Boolean(shiftId);
    const [skills, setSkills] = useState([]);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requiredSkills: [],
        payAmount: '',
        capacity: '',
        applicationDeadline: '',
        startTime: '',
        endTime: '',
        location: ''
    });

    useEffect(() => {
        async function fetchSkills() {
            try {
                const allSkills = await getSkills();
                setSkills(allSkills);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchSkills();
    }, []);

    useEffect(() => {
        if (!isEditMode) return;

        async function fetchShift() {
            try {
                const shift = await getShiftById(shiftId);
                setFormData({
                    title: shift.title,
                    description: shift.description,
                    requiredSkills: shift.requiredSkills.map((skill) => skill._id),
                    payAmount: shift.payAmount,
                    capacity: shift.capacity,
                    applicationDeadline: toDateInputValue(shift.applicationDeadline),
                    startTime: toDateTimeInputValue(shift.startTime),
                    endTime: toDateTimeInputValue(shift.endTime),
                    location: shift.location
                });
            } catch (err) {
                setError(err.message);
            }
        }
        fetchShift();
    }, [shiftId, isEditMode]);

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    function handleSkillsChange(event) {
        const selectedSkillIds = Array.from(event.target.selectedOptions, (oneSkill) => oneSkill.value);
        setFormData({ ...formData, requiredSkills: selectedSkillIds });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        try {
            const savedShift = isEditMode
                ? await updateShift(shiftId, formData)
                : await createShift(formData);
            if (savedShift) {
                navigate(`/shifts/${savedShift._id}`);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className='form-card'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' required name='title' value={formData.title} onChange={handleChange} id='title' />
                </div>

                <div className='form-group'>
                    <label htmlFor='description'>Description</label>
                    <input type='text' required name='description' value={formData.description} onChange={handleChange} id='description' />
                </div>

                <div className='form-group'>
                    <label htmlFor='payAmount'>Pay Amount</label>
                    <input type='number' required min="10" name='payAmount' value={formData.payAmount} onChange={handleChange} id='payAmount' />
                </div>

                <div className='form-group'>
                    <label htmlFor='capacity'>Capacity</label>
                    <input type='number' required min="1" name='capacity' value={formData.capacity} onChange={handleChange} id='capacity' />
                </div>

                <div className='form-group'>
                    <label htmlFor='requiredSkills'>Required Skills</label>
                    <select multiple name='requiredSkills' value={formData.requiredSkills} onChange={handleSkillsChange} id='requiredSkills'>
                        {skills.map((skill) => (
                            <option key={skill._id} value={skill._id}>{skill.name}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor='applicationDeadline'>Application Deadline</label>
                    <input type='date' required name='applicationDeadline' value={formData.applicationDeadline} onChange={handleChange} id='applicationDeadline' />
                </div>

                <div className='form-group'>
                    <label htmlFor='startTime'>Start Time</label>
                    <input type='datetime-local' required name='startTime' value={formData.startTime} onChange={handleChange} id='startTime' />
                </div>

                <div className='form-group'>
                    <label htmlFor='endTime'>End Time</label>
                    <input type='datetime-local' required name='endTime' value={formData.endTime} onChange={handleChange} id='endTime' />
                </div>

                <div className='form-group'>
                    <label htmlFor='location'>Location</label>
                    <input type='text' required name='location' value={formData.location} onChange={handleChange} id='location' />
                </div>

                {error && <p className='error'>{error}</p>}

                <button type="submit" className='btn btn-primary btn-block'>{isEditMode ? 'Save Changes' : 'Create Shift'}</button>

            </form>
        </div>
    )
}

export default ShiftForm
