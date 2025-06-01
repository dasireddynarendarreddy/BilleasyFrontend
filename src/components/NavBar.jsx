import { useState,} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../App';
function NavBar() {
  const{isloggedin,setloggedin}=useContext(AuthContext)
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  

  const handleLogout = () => {
    localStorage.removeItem('token');
    setloggedin(false);
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap">
        {/* Logo / Brand */}
        <div className="text-xl font-bold">
          <Link to="/" onClick={() => setMenuOpen(false)}>BookStore</Link>
        </div>

        {/* Hamburger icon - mobile only */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu items */}
        <div
          className={`
            w-full sm:w-auto
            ${menuOpen ? 'block' : 'hidden'}
            sm:flex sm:items-center sm:gap-6
          `}
        >
          {isloggedin ? (
  <>
    <Link
      to="/add-book"
      onClick={() => setMenuOpen(false)}
      className="block py-2 px-4 hover:underline"
    >
      Add Book
    </Link>
    <button
      onClick={handleLogout}
      className="block py-2 px-4 hover:underline text-left w-full sm:w-auto"
    >
      Logout
    </button>
  </>
) : (
  <>
    <Link
      to="/signup"
      onClick={() => setMenuOpen(false)}
      className="block py-2 px-4 hover:underline"
    >
      Sign Up
    </Link>
    <Link
      to="/login"
      onClick={() => setMenuOpen(false)}
      className="block py-2 px-4 hover:underline"
    >
      Login
    </Link>
  </>
)}

        </div>
      </div>
    </nav>
  );
}

export default NavBar;
