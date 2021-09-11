import React from 'react';
import '../styles/components/header.scss';
import { Link } from 'react-router-dom';

import UserIcon from '../assets/images/userIcon.png';
import SearchIcon from '../assets/images/searchIcon.png';

function Header() {
  return (
    <div className="header">
      <div className="headerWrap">
        <div className="headerLogoAndMenu">
          <Link to="/" className="headerLogo"><h3>Febx.</h3></Link>
          <span className="headerBreakerLine"></span>
          <div className="headerMenu">
            <Link to="/articles" className="link">Articles</Link>
            <Link to="/projects" className="link">Projects</Link>
            <Link to="/about" className="link">About Me</Link>
          </div>
        </div>
        <div className="headerIcons">
          <button type="button" className="headerBtn"><img src={SearchIcon} alt={SearchIcon} className="icon userIcon" /></button>
          <button type="button" className="headerBtn"><img src={UserIcon} alt={UserIcon} className="icon searchIcon" /></button>
        </div>
      </div>
    </div>
  );
}

export default Header;
