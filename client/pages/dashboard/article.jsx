import React, { useState, useEffect } from 'react';
import '../../styles/pages/dashArticle.scss';

import FormArticle from '../../components/dashboard/article/form';
import ListArticle from '../../components/dashboard/article/result';

const isDev = process.env.NODE_ENV === 'development';

function DashArticle({ isLoggedIn }) {
  // State untuk menyimpan seluruh artikel
  const [listOfArticles, setListOfArticles] = useState([]);

  // Mengambil seluruh artikel dari server
  const handleTakeAllArticles = async () => {
    try {
      const endpoint = isDev ? 'http://localhost:8000/api/articles' : '/api/articles';
      const request = await (await fetch(endpoint)).json();

      setListOfArticles(request.data);
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  useEffect(() => {
    document.title = 'Febx - Manage Your Article';
    handleTakeAllArticles();
  }, []);

  return (
    <div className="dasharticle">
      <div className="dasharticle_wrap">
        <FormArticle isLoggedIn={isLoggedIn} handleTakeAllArticles={handleTakeAllArticles} />
        <div className="dasharticle_footer">
          <div className="footer_location">
            <p className="paragraf location_iso">ISO 3166 Alpha 2:ID-JK /TC 46</p>
            <p className="paragraf location_code">ID -6.2304475,106. 7211711,17z</p>
          </div>
        </div>
        <ListArticle
          handleTakeAllArticles={handleTakeAllArticles}
          listOfArticles={listOfArticles}
        />
      </div>
    </div>
  );
}

export default DashArticle;
