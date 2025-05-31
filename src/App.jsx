import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import BookDetails from './components/BookDetails';
import Navbar from './components/Navbar';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
export const AuthContext=createContext('')
function App() {
  const[isloggedin,setloggedin]=useState(false)
  const user = JSON.parse(localStorage.getItem('token'));
  console.log(user)
  const [book, setBook] = useState({ title: '', author: '', genre: '' });

  useEffect(() => {
    // Mock example to load user from localStorage or API
    const storedUser = localStorage.getItem('token');
    if (storedUser) {
      setloggedin(true);
    }
  }, []);
  return (
    <Router>
      
      <AuthContext.Provider value={{isloggedin,setloggedin,book,setBook}}>
         <Navbar />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-book" element={<AddBook user={user}/>} />
        <Route path="/books/:id" element={<BookDetails user={user} />} />
      </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
