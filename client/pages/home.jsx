import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/home.scss';

function Home() {
  const [doctitle, setDoctitle] = useState(document.title);

  const handleDocTitle = () => setDoctitle('Febx - Home');

  useEffect(() => {
    document.title = doctitle;
    handleDocTitle();
  }, [doctitle]);

  return (
    <div className="home">
      <div className="home_wrap">

        <div className="banner">
          <div className="banner_header">
            <span className="strip"></span>
            <p className="intro">Introduction</p>
          </div>
          <p className="title">Hi, Do You Know Me?</p>

          <div className="banner_link">
            <p className="paragraf">On this website I include my portfolio.</p>
            <Link to="/portfolio" className="link">
              <div className="link_wrap">
                <p>View Portfolio</p>
                <span className="strips strip-1"></span>
                <span className="strips strip-2"></span>
              </div>
            </Link>
          </div>
        </div>

        <div className="footer">
          <div className="footer_wrap">
            <div className="footer_location">
              <p className="paragraf location_iso">ISO 3166 Alpha 2:ID-JK /TC 46</p>
              <p className="paragraf location_code">ID -6.2304475,106. 7211711,17z</p>
            </div>
            <div className="footer_nav">
              <div className="footer_nav_wrap">
                <Link to="/feedback" className="link">
                  <div className="link_wrap">
                    <p>Feedback</p>
                    <span className="strips strip-1"></span>
                    <span className="strips strip-2"></span>
                  </div>
                </Link>
                <Link to="/feedback" className="link">
                  <div className="link_wrap">
                    <p>Join The Chat Room</p>
                    <span className="strips strip-1"></span>
                    <span className="strips strip-2"></span>
                  </div>
                </Link>
                <Link to="/feedback" className="link">
                  <div className="link_wrap">
                    <p>Open API</p>
                    <span className="strips strip-1"></span>
                    <span className="strips strip-2"></span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
