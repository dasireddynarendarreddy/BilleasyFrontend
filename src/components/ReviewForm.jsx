import { useState } from 'react';
import axios from 'axios';

function ReviewForm({ bookId }) {
  const [review, setReview] = useState({ rating: '', comment: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    //import.meta.env.MODE === 'development'?`${API_URL}/books/${id}`:`${import.meta.env.VITE_API_REAL_URL}/books/${id}
    const token = localStorage.getItem("token");
    await axios.post(import.meta.env.MODE === 'development'?`${import.meta.env.VITE_API_URL}/books/${bookId}/reviews`:`${import.meta.env.VITE_API_REAL_URL}/books/${bookId}/reviews`, review, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Review submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Rating (1-5)" onChange={(e) => setReview({ ...review, rating: e.target.value })} />
      <textarea placeholder="Comment" onChange={(e) => setReview({ ...review, comment: e.target.value })} />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
