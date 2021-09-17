import React, { useState, useEffect } from 'react';
import '../../styles/containers/dashboard/article.dash.scss';

import FormArticle from '../../components/dashboard/articleDash/form.article';
import ListArticle from '../../components/dashboard/articleDash/list.article';

function ArticleDash({ isLoggedIn }) {
  // State untuk menyimpan seluruh artikel
  const [listOfArticles, setListOfArticles] = useState([]);

  // Mengambil seluruh artikel dari server
  const handleTakeAllArticles = async () => {
    try {
      const request = await (await fetch('http://localhost:8000/api/articles')).json();
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
    <div className="articledash">
      <FormArticle isLoggedIn={isLoggedIn} handleTakeAllArticles={handleTakeAllArticles} />
      <ListArticle listOfArticles={listOfArticles} />
    </div>
  );
}

export default ArticleDash;
