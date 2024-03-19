import React, { useState ,useContext} from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
function Login({handleToken}) {
  const {setUserId} = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
        
        const response = await fetch('http://localhost:5000/login',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        }).then(data => data.json());
        if(!response){
            throw new Error("Login request failed");
        }
        handleToken(response.token);
        setUserId(response.userId);
        navigate('/home');
        
        setFormData({
            email: '',
            password: '',
          });
    }catch(err){
        console.log(err);
    }
    
  };

  return (
    
    <form onSubmit={handleSubmit} className='login'>
        <h2>Login</h2>
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
      <button type="submit">Login</button>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </form>
  );
}

export default Login;
