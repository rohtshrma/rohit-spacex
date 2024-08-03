// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const sidebarStyle = {
    width: '250px',
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '40px',
  };

  const menuStyle = {
    listStyle: 'none',
    padding: '0',
    width: '100%',
  };

  const menuItemStyle = {
    margin: '20px 0',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    display: 'block',
    textAlign: 'center',
    width: '100%',
    padding: '10px 0',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  };

  const linkHoverStyle = {
    backgroundColor: '#34495e',
  };

  return (
    <div style={sidebarStyle}>
      <div style={logoStyle}>Logo</div>
      <ul style={menuStyle}>
        <li style={menuItemStyle}>
          <Link to="/dashboard" style={linkStyle} onMouseEnter={e => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor} onMouseLeave={e => e.currentTarget.style.backgroundColor = ''}>
            Dashboard
          </Link>
        </li>
        <li style={menuItemStyle}>
          <Link to="/rockets" style={linkStyle} onMouseEnter={e => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor} onMouseLeave={e => e.currentTarget.style.backgroundColor = ''}>
            Rockets
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
