import { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [user, setUser] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_API_URL}/signup`, user);
    alert("Signup successful");
  };

  return (
   <form 
  onSubmit={handleSubmit} 
  className="w-full max-w-sm mx-auto mt-16 p-6 bg-white rounded-2xl shadow-md space-y-5"
>
  <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

  <div>
    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
      Username
    </label>
    <input
      id="username"
      type="text"
      placeholder="Enter your username"
      onChange={(e) => setUser({ ...user, username: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  <div>
    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
      Password
    </label>
    <input
      id="password"
      type="password"
      placeholder="Create a password"
      onChange={(e) => setUser({ ...user, password: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  <button
    type="submit"
    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-300"
  >
    Sign Up
  </button>
</form>

  );
}

export default Signup;
