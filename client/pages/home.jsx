import React, { useEffect } from 'react';
import '../styles/pages/home.scss';

function Home() {
  useEffect(() => {
    document.title = 'Febx - Home';
  }, []);

  return (
    <div className="home">
      <div className="homeWrap">
        <div className="homeHeader">
          <span className="bullets"></span>
          <h1 className="homeHeaderH1">Live life with <span>Logic</span> and <span>Creativity</span>.</h1>
        </div>
        <div className="homeFooter">
          <div className="homeFooterWrap">
            <div className="homeContact">
              <p>+62 851-5670-3982</p>
              <p>ISO 3166 Alpha 2:ID-JK /TC 46</p>
            </div>
            <p>&copy; 2021 Febx</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
