import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserIcon from '../assets/images/userIcon.png';
import SearchIcon from '../assets/images/searchIcon.png';
import '../styles/containers/header.scss';

import MenuHeader from '../components/header/menu.header';
import Login from './login';
import Register from './register';

function Header() {
  // State untuk menu icon header
  const [loginFormIsOpen, setLoginFormIsOpen] = useState(false);
  const [registerFormIsOpen, setRegisterFormIsOpen] = useState(false);
  const [menuIconIsOpen, setMenuIconIsOpen] = useState(false);

  // Handle buka & tutup formulir login
  const handleOpenLoginForm = () => {
    setRegisterFormIsOpen(false);
    setLoginFormIsOpen(true);
  }

  const handleOpenRegisterForm = () => {
    setLoginFormIsOpen(false);
    setRegisterFormIsOpen(true);
  }

  const handleOpenMenuIcon = () => {
    // Kondisi jika menu icon dalam keadaan tertutup
    if (!menuIconIsOpen) {
      return setMenuIconIsOpen(true);
    }

    return setMenuIconIsOpen(false);
  }

  const menuIconBtnIsOpen = () => {
    const strips = document.querySelectorAll('.headerMenuIconBtn .line');

    if (!menuIconIsOpen) {
      const filterStrips = [strips[1], strips[2]];

      for (let i = 0; i < filterStrips.length; i += 1) {
        filterStrips[i].setAttribute('style', 'transform: rotate(0)');
      }

      strips[0].style = 'transform: translateY(-6px)';
      strips[3].style = 'transform: translateY(6px)';

      return false;
    }

    const filterStrips = [strips[0], strips[3]];

    for (let i = 0; i < filterStrips.length; i += 1) {
      filterStrips[i].setAttribute('style', 'opacity: 0; transform: translateY(0)');
    }

    strips[1].style = 'transform: rotate(-45deg)';
    strips[2].style = 'transform: rotate(45deg)';

    return true;
  }

  useEffect(() => menuIconBtnIsOpen());

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
              onClick={handleOpenLoginForm}
              style={registerFormIsOpen || loginFormIsOpen ? { backgroundColor: '#f3f0df' } : null}
            >
              <img src={UserIcon} alt={UserIcon} className="icon searchIcon" />
            </button>
          </div>
          <div className="headerMenuIcon">
            <button type="button" className="headerMenuIconBtn" onClick={handleOpenMenuIcon}>
              <span className="line line-1"></span>
              <span className="line line-2"></span>
              <span className="line line-3"></span>
              <span className="line line-4"></span>
            </button>
          </div>
        </div>
      </div>

      <MenuHeader
        styles={menuIconIsOpen ? { transform: 'translateX(0)' } : null}
      />
      <Login
        openRegisterForm={() => handleOpenRegisterForm()}
        closeLoginForm={() => setLoginFormIsOpen(false)}
        displayForm={loginFormIsOpen ? { opacity: 1, zIndex: 8 } : { opacity: 0, zIndex: -8 }}
      />
      <Register
        closeRegisterForm={() => setRegisterFormIsOpen(false)}
        openLoginForm={() => handleOpenLoginForm()}
        displayForm={registerFormIsOpen ? { opacity: 1, zIndex: 8 } : { opacity: 0, zIndex: -8 }}
      />
    </React.Fragment>
  );
}

export default Header;
