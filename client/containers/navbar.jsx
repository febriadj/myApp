import React, { useState } from 'react';
import '../styles/containers/navbar.scss';

import UserIcon from '../assets/images/userIcon.png';
import SearchIcon from '../assets/images/searchIcon.png';

import MenuNavbar from '../components/navbar/menu.navbar';
import Login from './login';
import Register from './register';
import MenuOnline from '../components/navbar/menuOnline.navbar';
import Search from './search';

function Navbar({ isLoggedIn, handleIsLoggedIn }) {
  // state
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [registerFormIsOpen, setRegisterFormIsOpen] = useState(false);
  const [loginFormIsOpen, setLoginFormIsOpen] = useState(false);
  const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);
  const [menuOnlineIsOpen, setMenuOnlineIsOpen] = useState(false);

  const handleMenuIsOpen = () => {
    // Tutup komponen navbar lain jika kondisi sedang terbuka
    if (searchBarIsOpen) setSearchBarIsOpen(false);
    if (menuOnlineIsOpen) setMenuOnlineIsOpen(false);

    // Jika menu dalam kondisi tertutup
    if (!menuIsOpen) {
      return setMenuIsOpen(true);
    }

    return setMenuIsOpen(false);
  }

  const handleCloseLoginForm = () => setLoginFormIsOpen(false);
  const handleOpenRegisterForm = () => {
    setLoginFormIsOpen(false);
    setRegisterFormIsOpen(true);
  };

  const handleOpenLoginForm = () => {
    setRegisterFormIsOpen(false);
    setLoginFormIsOpen(true);
  }

  const handleOpenSearchBar = () => {
    // Tutup menu navbar jika kondisi sedang terbuka
    if (menuIsOpen) {
      setMenuIsOpen(false);
    }

    if (menuOnlineIsOpen) setMenuOnlineIsOpen(false);
    if (!searchBarIsOpen) {
      return setSearchBarIsOpen(true);
    }

    return setSearchBarIsOpen(false);
  }

  const handleMenuOnlineIsOpen = () => {
    if (!isLoggedIn.status) {
      return setMenuOnlineIsOpen(false);
    }

    // Tutup komponen navbar lain jika kondisi sedang terbuka
    if (searchBarIsOpen) setSearchBarIsOpen(false);
    if (menuIsOpen) setMenuIsOpen(false);
    if (menuOnlineIsOpen) return setMenuOnlineIsOpen(false);

    return setMenuOnlineIsOpen(true);
  }

  const ProfileIconComponents = () => {
    if (!isLoggedIn.status) {
      return (
        <button
          className="icons_btn navbar_profile_btn"
          type="button"
          style={loginFormIsOpen || registerFormIsOpen ? { background: '#fcf6ff' } : null}
          onClick={handleOpenLoginForm}
        >
          <img src={UserIcon} alt={UserIcon} className="icons profile_icon" />
        </button>
      );
    }

    return (
      <button
        className="icons_btn navbar_profile_btn"
        type="button"
        style={menuOnlineIsOpen ? { background: '#fcf6ff' } : null}
        onClick={handleMenuOnlineIsOpen}
      >
        <img src={UserIcon} alt={UserIcon} className="icons profile_icon" />
        <span className="is_online"></span>
      </button>
    );
  }

  return (
    <React.Fragment>
      <div className="navbar">
        <div className="navbar_wrap">

          <div className="navbar_header">
            <ProfileIconComponents />
            <button
              type="button"
              className="icons_btn navbar_search_btn"
              style={searchBarIsOpen ? { background: '#fcf6ff' } : null}
              onClick={handleOpenSearchBar}
            >
              <img src={SearchIcon} alt={SearchIcon} className="icons search_icon" />
            </button>
          </div>

          <div className="navbar_menu">
            <button type="button" className="navbar_menu_btn" onClick={handleMenuIsOpen}>
              <div className="navbar_menu_icon">
                <span className="strips strip-1"></span>
                <span className="strips strip-2"></span>
                <span className="strips strip-3"></span>
                <span className="strips strip-4"></span>
              </div>
              <p className="paragraf">Menu</p>
            </button>
          </div>

        </div>
      </div>

      <MenuNavbar
        handleMenuIsOpen={handleMenuIsOpen}
        styles={menuIsOpen ? { transform: 'translateX(0)', zIndex: 9 } : null}
      />

      <Login
        openRegisterForm={() => handleOpenRegisterForm()}
        closeLoginForm={handleCloseLoginForm}
        displayForm={loginFormIsOpen ? { transform: 'translateX(0)', zIndex: 10 } : null}
        handleIsLoggedIn={handleIsLoggedIn}
        isLoggedIn={isLoggedIn}
      />

      <Register
        closeRegisterForm={() => setRegisterFormIsOpen(false)}
        openLoginForm={() => handleOpenLoginForm()}
        displayForm={registerFormIsOpen ? { transform: 'translateX(0)', zIndex: 10 } : null}
      />

      <MenuOnline
        handleMenuOnlineIsOpen={handleMenuOnlineIsOpen}
        isLoggedIn={isLoggedIn}
        handleIsLoggedIn={handleIsLoggedIn}
        styles={
          menuOnlineIsOpen ? { transform: 'translateX(0)', zIndex: 9, opacity: 1 } : null
        }
      />

      <Search
        handleOpenSearchBar={handleOpenSearchBar}
        styles={
          searchBarIsOpen ? { transform: 'translateX(0)', opacity: 1, zIndex: 8 } : null
        }
      />
    </React.Fragment>
  );
}

export default Navbar;
