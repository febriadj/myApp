import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../styles/pages/default.scss';

export default function Default() {
  useEffect(() => {
    document.title = 'Febx - 404';
  }, []);

  return (
    <div className="default">
      <div className="default_wrap">
        <div className="default_header">
          <span className="strip"></span>
          <h1 className="title">Oops. 404</h1>
        </div>
        <p className="paragraf">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, eos, dignissimos libero exercitationem excepturi necessitatibus, reiciendis repellat voluptas laborum ex officiis sit. Minus aspernatur dolorem voluptate quisquam enim vitae omnis.</p>
        <Link to="/" className="link">
          <div className="link_wrap">
            <p>Back to Main Page</p>
            <span className="strips strip-1"></span>
            <span className="strips strip-2"></span>
          </div>
        </Link>
      </div>
    </div>
  );
}
