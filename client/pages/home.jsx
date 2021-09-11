import React, { useEffect } from 'react';

function Home() {
  useEffect(() => {
    document.title = 'Febx - Let\'s Share Creativity';
  }, []);

  return (
    <div className="home">
      <div className="homeWrap">
        <p>Hello World</p>
      </div>
    </div>
  );
}

export default Home;
