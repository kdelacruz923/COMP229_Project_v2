import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Design.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await onLogout();
    navigate('/');
  };

  const scrollToCollection = () => {
    if (window.location.pathname === '/' && !isAuthenticated) {
      const collectionElement = document.getElementById('our-collection');
      if (collectionElement) {
        collectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
    }
  };

  const isBooksActive = window.location.pathname === '/' && !isAuthenticated;

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo-link">
        <img src="/images/logo.png" alt="Logo" className="navbar-logo" />
      </NavLink>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <NavLink to="/userhomepage" className={({ isActive }) => isActive ? "active-link" : ""}>Books</NavLink>
            <NavLink to="/my-profile" className={({ isActive }) => isActive ? "active-link" : ""}>My Profile</NavLink>
            <button onClick={handleLogout} className="logout-button">Sign Out</button>
          </>
        ) : (
          <>
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>
            <div onClick={scrollToCollection} className={`navbar-link ${isBooksActive ? 'active-link' : ''}`}>Books</div>
            <NavLink to="/signup" className={({ isActive }) => isActive ? "active-link" : ""}>Register</NavLink>
            <NavLink to="/signin" className={({ isActive }) => isActive ? "active-link" : ""}>Login</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
