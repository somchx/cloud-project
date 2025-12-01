import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Navigate to landing page
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1>POS System</h1>
        <div className="nav-links">
          <Link
            to="/dashboard"
            className={location.pathname === '/dashboard' ? 'active' : ''}
          >
            Dashboard
          </Link>
          <Link
            to="/pos"
            className={location.pathname === '/pos' ? 'active' : ''}
          >
            Point of Sale
          </Link>
          <Link
            to="/products"
            className={location.pathname === '/products' ? 'active' : ''}
          >
            Products
          </Link>
          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <span className="logout-icon">⎋</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
