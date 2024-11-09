import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Users, LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '../store/app.store';
import '../styles/styling/Navbar.scss';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const navItems = [
    { icon: <Home size={20} />, label: 'Home', path: '/' },
    // { icon: <Users size={20} />, label: 'Characters', path: '/characters' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar"> 
      <div className="navbar__container">
        <div className="navbar__brand">
          <span className="navbar__logo">★</span>
          <span className="navbar__title">Star Wars</span>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar__menu">
          {navItems.map((item) => (
            <button 
              key={item.label} 
              className="navbar__item"
              onClick={() => handleNavigation(item.path)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <button 
            className="navbar__item navbar__item--logout"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="navbar__toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${isOpen ? 'navbar__mobile--open' : ''}`}>
        {navItems.map((item) => (
          <button 
            key={item.label} 
            className="navbar__mobile-item"
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
        <button 
          className="navbar__mobile-item navbar__mobile-item--logout"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;