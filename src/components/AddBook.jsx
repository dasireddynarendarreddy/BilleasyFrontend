import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function AddBook({user}) {
  const [book, setBook] = useState({ title: '', author: '', genre: '' });
  const navigate = useNavigate();

  useEffect(() => {
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to add a book');
      navigate('/login');
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //import.meta.env.MODE === 'development'?`${API_URL}/books/${id}`:`${import.meta.env.VITE_API_REAL_URL}/books/${id}
      const res=await axios.post(import.meta.env.MODE === 'development'?`${import.meta.env.VITE_API_URL}/books`:`${import.meta.env.VITE_API_REAL_URL}/books`, book, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if(res.status==201)
      {
        toast.success("Book Added Sucessfully!")
      }
      navigate('/');
    } catch (err) {
    toast.error(err.response.data.message)
    }
  };

  return (
    <div>
      <ToastContainer/>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <input placeholder="Title" className="block w-full mb-4 p-2 border" onChange={(e) => setBook({ ...book, title: e.target.value })} />
      <input placeholder="Author" className="block w-full mb-4 p-2 border" onChange={(e) => setBook({ ...book, author: e.target.value })} />
      <input placeholder="Genre" className="block w-full mb-4 p-2 border" onChange={(e) => setBook({ ...book, genre: e.target.value })} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Book</button>
    </form>
    </div>
  );
}

export default AddBook;
