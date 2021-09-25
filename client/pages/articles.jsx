import React, { useState, useEffect } from 'react';
import Footer from '../containers/footer';

function Articles() {
  const [doctitle, setDoctitle] = useState(document.title);

  const handleDocTitle = () => setDoctitle('Febx - Articles');

  useEffect(() => {
    document.title = doctitle;
    handleDocTitle();
  }, [doctitle]);

  return (
    <Footer />
  );
}

export default Articles;
