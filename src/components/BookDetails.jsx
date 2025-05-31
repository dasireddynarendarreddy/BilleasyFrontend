
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function BookDetail({user} ) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reviewsPerPage] = useState(2); // You can make this dynamic
 
  useEffect(() => {
    fetchBook();
  }, [page]);

  const fetchBook = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/books/${id}`);
      console.log("current book data",res.data)
      setBook(res.data);
      setTotalPages(res.data);
    } catch (err) {
      console.error('Error fetching book:', err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please log in to add or edit a review');

    try {
      if (editingReviewId) {
        // Edit review
        await axios.put(`${API_URL}/api/reviews/${editingReviewId}`, {
          rating,
          comment,
        }, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } else {
        // Add new review
        await axios.post(`${API_URL}/api/books/${id}/reviews`, {
          rating,
          comment,
        }, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      }

      setRating(0);
      setComment('');
      setEditingReviewId(null);
      fetchBook();
    } catch (error) {
      console.error('Review error:', error.response?.data || error.message);
    }
  };

  const handleEdit = (review) => {
    setRating(review.rating);
    setComment(review.comment);
    setEditingReviewId(review._id);
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`${API_URL}/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchBook();
    } catch (error) {
      console.error('Delete error:', error.response?.data || error.message);
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
      <p className="mb-1"><strong>Author:</strong> {book.author}</p>
      <p className="mb-1"><strong>Genre:</strong> {book.genre}</p>
      <p className="mb-2"><strong>Average Rating:</strong> {book.averageRating?.toFixed(1) || 0}</p>

      <h2 className="text-xl font-semibold mt-6 mb-4">Reviews</h2>

{book.reviews.length === 0 ? (
  <p className="text-gray-500">No reviews yet.</p>
) : (
  <div className="max-h-96 overflow-y-auto space-y-4 border rounded p-4 bg-white shadow-sm">
    {book.reviews.map((review) => (
      <div key={review._id} className="flex space-x-4">
        {/* Avatar placeholder */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
            {review.user?.name ? review.user.name.charAt(0).toUpperCase() : "A"}
          </div>
        </div>

        {/* Review content */}
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-900">{review.user?.name || 'Anonymous'}</p>
            <p className="text-sm font-medium text-yellow-500">⭐ {review.rating}</p>
          </div>
          <p className="text-gray-700 mt-1">{review.comment}</p>

          {user && (
            (review.user?._id?.toString() || review.user?.toString()) === (user.user?._id?.toString() || user.user?.toString()) && (
              <div className="flex gap-4 mt-2 text-sm">
                <button
                  onClick={() => handleEdit(review)}
                  className="text-yellow-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            )
          )}
        </div>
      </div>
    ))}
  </div>
)}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2 mt-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage(prev => prev - 1)}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(prev => prev + 1)}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      
      {user && (
        <form onSubmit={handleReviewSubmit} className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold">{editingReviewId ? 'Edit Review' : 'Add a Review'}</h3>
          <label className="block mt-2">
            Rating:
            <input
              type="number"
              value={rating}
              min={1}
              max={5}
              onChange={(e) => setRating(Number(e.target.value))}
              required
              className="block border p-1 mt-1 w-20"
            />
          </label>
          <label className="block mt-2">
            Comment:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="block border p-2 mt-1 w-full"
            />
          </label>
          <button type="submit" className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">
            {editingReviewId ? 'Update Review' : 'Submit Review'}
          </button>
        </form>
      )}
    </div>
  );
}

export default BookDetail;
