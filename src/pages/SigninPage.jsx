// src/components/SignInForm/SignInForm.jsx

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { signIn } from '../services/authService';
import { useAuth } from '../context/AuthContext';


const SignInForm = ({}) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  function handleChange(event){
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event){
    event.preventDefault();
    try {
      const signedInUser = await signIn(formData);

      setUser(signedInUser);

      if (!user.isProfileComplete) {
        navigate('/profile/form');
      } else if (user.role === 'worker') {
        navigate('/shifts');
      } else {
        navigate('/business/shifts');
      }
      
    } catch (err) {
      console.log(`Error: ${err}`)
      setError(err?.response?.data?.message || err.message);
    }
  };

  return (
    <main className='auth-page'>
      <div className='auth-card'>
        <h1 className='auth-title'>Sign In</h1>
        {error && <p className='error'>{error}</p>}
        <form autoComplete='off' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='username' className='form-label'>Username</label>
            <input
              type='text'
              autoComplete='off'
              id='username'
              className='form-input'
              value={formData.username}
              name='username'
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password' className='form-label'>Password</label>
            <input
              type='password'
              autoComplete='off'
              id='password'
              className='form-input'
              value={formData.password}
              name='password'
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-actions'>
            <button className='btn btn-primary btn-block'>Sign In</button>
            <button type='button' onClick={() => navigate('/')} className='btn btn-block'>Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignInForm;

