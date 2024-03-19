import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can perform validation, submit data, etc.
    try{
        
        const response = await fetch('http://localhost:5000/signup',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        });
        if(!response){
            throw new Error("Sign up request failed");
        }
        navigate('/');
        
        setFormData({
            name: '',
            email: '',
            password: '',
          });
    }catch(err){
        console.log(err);
    }
    
  };

  return (
    
    <form onSubmit={handleSubmit} className='signup-form'>
        <h2>Sign Up</h2>
      <div>
        <label htmlFor="name">Username:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
