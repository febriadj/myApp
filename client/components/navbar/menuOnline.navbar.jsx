import React from 'react';
import { Link } from 'react-router-dom';

const isDev = process.env.NODE_ENV === 'development';

function MenuOnline({ styles, handleMenuOnlineIsOpen, handleIsLoggedIn }) {
  const handleLogout = async () => {
    try {
      const endpoint = isDev ? 'http://localhost:8000/api/admin/logout' : '/api/admin/logout';
      await (await fetch(endpoint)).json();

      handleIsLoggedIn();
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  return (
    <div className="menu_online" style={styles}>
      <div className="menu_online_wrap">
        <Link to="/dashboard" className="link" onClick={handleMenuOnlineIsOpen}>
          <div className="link_wrap">
            <p>Manage Your Articles</p>
            <span className="strips strip-1"></span>
            <span className="strips strip-2"></span>
          </div>
        </Link>
        <Link to="/dashboard" className="link" onClick={handleMenuOnlineIsOpen}>
          <div className="link_wrap">
            <p>Manage Your Works</p>
            <span className="strips strip-1"></span>
            <span className="strips strip-2"></span>
          </div>
        </Link>
        <button
          className="logout_btn"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default MenuOnline;
