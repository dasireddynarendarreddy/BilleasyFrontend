import { useState } from 'react';
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
    //import.meta.env.MODE === 'development'?`${API_URL}/books/${id}`:`${import.meta.env.VITE_API_REAL_URL}/books/${id}
    const res = await axios.post(import.meta.env.MODE === 'development'?`${import.meta.env.VITE_API_URL}/login`:`${import.meta.env.VITE_API_REAL_URL}/login`, user);
    localStorage.setItem("token", JSON.stringify(res.data));
    console.log("the data is ",res.data)
    setloggedin(true)
    alert("Login successful");
    navigate('/')
  };

  return (
    <form 
  onSubmit={handleSubmit} 
  className="w-full max-w-sm mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg space-y-5"
>
  <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
      Username
    </label>
    <input
      id="username"
      type="text"
      placeholder="Enter your username"
      onChange={(e) => setUser({ ...user, username: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
      Password
    </label>
    <input
      id="password"
      type="password"
      placeholder="Enter your password"
      required
      onChange={(e) => setUser({ ...user, password: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <button
    type="submit"
    required
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
  >
    Login
  </button>
</form>

  );
}

export default Login;
