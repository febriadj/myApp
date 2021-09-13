import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserIcon from '../assets/images/userIcon.png';
import SearchIcon from '../assets/images/searchIcon.png';
import '../styles/components/header.scss';

import MenuHeader from '../components/header/menu.header';

function Header({ openLoginForm, bgIcon }) {
  // State untuk menu icon header
  const [menuIconIsOpen, setMenuIconIsOpen] = useState(false);

  const handleOpenMenuIcon = () => {
    // Kondisi jika menu icon dalam keadaan tertutup
    if (!menuIconIsOpen) {
      return setMenuIconIsOpen(true);
    }

    return setMenuIconIsOpen(false);
  }

  return (
    <React.Fragment>
      <div className="header">
        <div className="headerWrap">
          <div className="headerLogoAndLinks">
            <Link to="/" className="headerLogo"><h3>Febx.</h3></Link>
            <span className="headerBreakerLine"></span>
            <div className="headerLinks">
              <Link to="/articles" className="link">Articles</Link>
              <Link to="/projects" className="link">Projects</Link>
              <Link to="/about" className="link">About Me</Link>
            </div>
          </div>
          <div className="headerIcons">
            <button type="button" className="headerBtn"><img src={SearchIcon} alt={SearchIcon} className="icon userIcon" /></button>
            <button
              type="button"
              className="headerBtn"
              onClick={openLoginForm}
              style={bgIcon}
            >
              <img src={UserIcon} alt={UserIcon} className="icon searchIcon" />
            </button>
          </div>
          <div className="headerMenuIcon">
            <button type="button" className="headerMenuIconBtn" onClick={handleOpenMenuIcon}>
              <span
                className="line line-1"
                style={menuIconIsOpen ? { transform: 'translateY(0px)', opacity: 0 } : null}
              >
              </span>
              <span
                className="line line-2"
                style={menuIconIsOpen ? { opacity: 1, transform: 'rotate(-45deg)' } : null}
              >
              </span>
              <span
                className="line line-3"
                style={menuIconIsOpen ? { opacity: 1, transform: 'rotate(45deg)' } : null}
              >
              </span>
              <span
                className="line line-4"
                style={menuIconIsOpen ? { transform: 'translateY(0px)', opacity: 0 } : null}
              >
              </span>
            </button>
          </div>
        </div>
      </div>

      <MenuHeader
        styles={menuIconIsOpen ? { transform: 'translateX(0)' } : null}
      />
    </React.Fragment>
  );
}

export default Header;
