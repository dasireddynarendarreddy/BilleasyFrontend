
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1); // current page for pagination
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false); // toggle between search & pagination
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch paginated books
  const fetchBooks = async (page) => {
    setLoading(true);
    setError(null);
    try {
      ////import.meta.env.MODE === 'development'?`${API_URL}/books/${id}`:`${import.meta.env.VITE_API_REAL_URL}/books/${id}
      const res = await axios.get(import.meta.env.MODE === 'development'?`${import.meta.env.VITE_API_URL}/books?page=${page}&limit=7`:`${import.meta.env.VITE_API_REAL_URL}/books?page=${page}&limit=7`);
      setBooks(res.data.books || []);
      setTotalPages(res.data.totalPages || 1);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch books');
      setLoading(false);
    }
  };

  // Search books by title
  const searchBooks = async (query) => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      ////import.meta.env.MODE === 'development'?`${API_URL}/books/${id}`:`${import.meta.env.VITE_API_REAL_URL}/books/${id}
      const res = await axios.get(import.meta.env.MODE === 'development'?`${import.meta.env.VITE_API_URL}/search?query=${encodeURIComponent(query)}`:`${import.meta.env.VITE_API_REAL_URL}/search?query=${encodeURIComponent(query)}`);
      
      setBooks(res.data.books|| []);
      // When searching, pagination is off or managed differently
      setTotalPages(1);
      setLoading(false);
    } catch (err) {
      setError('Search failed');
      setLoading(false);
    }
  };

  // Handle input change
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (val.trim().length > 0) {
      setIsSearching(true);
      searchBooks(val.trim());
    } else {
      setIsSearching(false);
      setPage(1);
      fetchBooks(1);
    }
  };

  // Fetch books on page load and page change (only if not searching)
  useEffect(() => {
    if (!isSearching) {
      fetchBooks(page);
    }
  }, [page, isSearching]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Books</h1>
        <Link
          to="/add-book"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add Book
        </Link>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search books by title..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-3 border rounded focus:outline-blue-500"
        />
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && books.length === 0 && (
        <p className="text-center text-gray-500">
          {isSearching ? 'No books found for your search.' : 'No books found. Please add some!'}
        </p>
      )}

      {!loading && books.length > 0 && (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book) => (
              <li
                key={book._id}
                className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition cursor-pointer"
              >
                <Link
                  to={`/books/${book._id}`}
                  className="block text-lg font-semibold text-gray-900 hover:text-blue-600"
                >
                  {book.title}
                </Link>
                {/* Optional: author, genre, etc */}
              </li>
            ))}
          </ul>

          {/* Pagination controls - only show if not searching */}
          {!isSearching && (
            <div className="mt-8 flex justify-center items-center gap-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={
                  page === 1
                    ? 'px-4 py-2 rounded cursor-not-allowed bg-gray-100 disabled:opacity-50 hover:bg-gray-400 transition'
                    : 'px-4 py-2 rounded cursor-pointer bg-gray-300 disabled:opacity-50 hover:bg-gray-400 transition'
                }
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page <span className="font-semibold">{page}</span> of{' '}
                <span className="font-semibold">{totalPages}</span>
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className={
                  page === totalPages
                    ? 'px-4 py-2 rounded cursor-not-allowed bg-gray-100 disabled:opacity-50 hover:bg-gray-400 transition'
                    : 'px-4 py-2 rounded cursor-pointer bg-gray-300 disabled:opacity-50 hover:bg-gray-400 transition'
                }
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BookList;


