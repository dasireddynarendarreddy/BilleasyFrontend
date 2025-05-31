import React, { useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [user, setUser] = useState({ username: '', password: '' });
const{setloggedin}=useContext(AuthContext)
const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, user);
    localStorage.setItem("token", JSON.stringify(res.data));
    console.log("the data is ",res.data)
    setloggedin(true)
    alert("Login successful");
    navigate('/')
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" onChange={(e) => setUser({ ...user, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
