import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/default.scss';

import Header from '../components/header';

export default function Default() {
  useEffect(() => {
    document.title = 'Febx - 404';
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div className="default">
        <div className="defaultWrap">
          <h1 className="default404">404</h1>
          <span className="defaultBreakerLine"></span>
          <div className="defaultTxt">
            <p>The page you are looking for could not be found.</p>
            <p>
              Please double check your url address or you can visit
              another link I recommend for you below.
            </p>
            <div className="defaultLinks">
              <Link to="/articles" className="link">Articles</Link>
              <Link to="/projects" className="link">Projects</Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
