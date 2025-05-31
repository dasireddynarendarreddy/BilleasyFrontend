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
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" onChange={(e) => setUser({ ...user, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
