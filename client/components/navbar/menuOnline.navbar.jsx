import React from 'react';
import { Link } from 'react-router-dom';

function MenuOnline({ styles, handleMenuOnlineIsOpen }) {
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
          type="submit"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default MenuOnline;
