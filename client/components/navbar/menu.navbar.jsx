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
          <Link to="/" className="link" onClick={handleClick}>
            <div className="link_wrap">
              <p>Home</p>
              <span className="strips strip-1"></span>
              <span className="strips strip-2"></span>
            </div>
          </Link>
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
        </div>

        <div className="menu_media">
          <p className="header">About</p>
          <p className="paragraf paragraf-1">
            Hi, I would like to inform you that the source code of this website is open source,
            visit my
            <a href="https://github.com/febriadj/myApp">Github Repository</a>
            to see the source code.
          </p>
          <p className="paragraf paragraf-2">
            If you have any feedback to give me, I've prepared a feedback page for you
          </p>
        </div>
      </div>
    </div>
  );
}

export default MenuNavbar;
