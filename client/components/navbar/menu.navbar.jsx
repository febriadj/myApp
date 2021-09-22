import React from 'react';
import { Link } from 'react-router-dom';

function MenuNavbar({ styles, handleMenuIsOpen }) {
  const handleClick = () => {
    setTimeout(() => handleMenuIsOpen(), 1000);
  }

  return (
    <div className="menu" style={styles}>
      <div className="menu_wrap">

        <div className="menu_links">
          <Link to="/articles" className="link" onClick={handleClick}>
            <div className="link_wrap">
              <p>Articles</p>
              <span className="strips strip-1"></span>
              <span className="strips strip-2"></span>
            </div>
          </Link>
          <Link to="/works" className="link" onClick={handleClick}>
            <div className="link_wrap">
              <p>Works</p>
              <span className="strips strip-1"></span>
              <span className="strips strip-2"></span>
            </div>
          </Link>
          <Link to="/portfolio" className="link" onClick={handleClick}>
            <div className="link_wrap">
              <p>Portfolio</p>
              <span className="strips strip-1"></span>
              <span className="strips strip-2"></span>
            </div>
          </Link>
          <Link to="/contact" className="link" onClick={handleClick}>
            <div className="link_wrap">
              <p>Contact</p>
              <span className="strips strip-1"></span>
              <span className="strips strip-2"></span>
            </div>
          </Link>
        </div>

        <div className="menu_media">
          <p className="header">About</p>
          <p className="paragraf paragraf-1">
            The code of this app is open source, you can see the source code through my
            <a href="https://github.com/febriadj/myApp">Github</a>
            repository, and also please know about the license used on this app.
          </p>
          <p className="paragraf paragraf-2">
            if you have some suggestions or criticisms for me,
            you can visit the feedback page I have provided
          </p>
        </div>
      </div>
    </div>
  );
}

export default MenuNavbar;
