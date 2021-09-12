import React from 'react';
import { Link } from 'react-router-dom';

function HeaderMenu({ styles }) {
  return (
    <div className="headerMenu" style={styles}>
      <div className="headerMenuWrap">
        <div className="headerMenuLinks">
          <Link to="/articles" className="link"><h3>01.</h3><p>Articles</p></Link>
          <Link to="/projects" className="link"><h3>02.</h3><p>Projects</p></Link>
          <Link to="/about" className="link"><h3>03.</h3><p>About Me</p></Link>
        </div>
      </div>
    </div>
  )
}

export default HeaderMenu;
