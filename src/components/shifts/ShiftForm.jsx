import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { createShift } from '../../services/shiftService'
import { getSkills } from '../../services/skillService'

function ShiftForm() {
    const navigate = useNavigate();
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
            const createdShift = await createShift(formData);
            if (createdShift) {
                navigate(`/shifts/${createdShift._id}`);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div>
            <h1>Create Shift</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title</label>
                <input type='text' required name='title' value={formData.title} onChange={handleChange} id='title' />

                <label htmlFor='description'>Description</label>
                <input type='text' required name='description' value={formData.description} onChange={handleChange} id='description' />

                <label htmlFor='payAmount'>Pay Amount</label>
                <input type='number' required min="10" name='payAmount' value={formData.payAmount} onChange={handleChange} id='payAmount' />

                <label htmlFor='capacity'>Capacity</label>
                <input type='number' required min="1" name='capacity' value={formData.capacity} onChange={handleChange} id='capacity' />

                <label htmlFor='requiredSkills'>Required Skills</label>
                <select multiple name='requiredSkills' value={formData.requiredSkills} onChange={handleSkillsChange} id='requiredSkills'>
                    {skills.map((skill) => (
                        <option key={skill._id} value={skill._id}>{skill.name}</option>
                    ))}
                </select>

                <label htmlFor='applicationDeadline'>Application Deadline</label>
                <input type='date' required name='applicationDeadline' value={formData.applicationDeadline} onChange={handleChange} id='applicationDeadline' />

                <label htmlFor='startTime'>Start Time</label>
                <input type='datetime-local' required name='startTime' value={formData.startTime} onChange={handleChange} id='startTime' />

                <label htmlFor='endTime'>End Time</label>
                <input type='datetime-local' required name='endTime' value={formData.endTime} onChange={handleChange} id='endTime' />

                <label htmlFor='location'>Location</label>
                <input type='text' required name='location' value={formData.location} onChange={handleChange} id='location' />

                <button type="submit">Create Shift</button>

            </form>
        </div>
    )
}

export default ShiftForm
