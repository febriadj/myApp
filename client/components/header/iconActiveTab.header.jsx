import React from 'react';
import { Link } from 'react-router-dom';

function IconActiveTab({ styles }) {
  return (
    <div className="iconActiveTab" style={styles}>
      <div className="iconActiveTabWrap">
        <div className="iconActiveTabBody">
          <Link to="/dashboard" className="link">Manage Your Articles</Link>
          <Link to="/dashboard" className="link">Manage Your Projects</Link>
          <button
            className="logoutBtn"
            type="submit"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default IconActiveTab;
