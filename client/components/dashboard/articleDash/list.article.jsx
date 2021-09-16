import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function ListArticle() {
  // State untuk menyimpan seluruh artikel
  const [listOfArticles, setListOfArticles] = useState([]);

  // Mengambil seluruh artikel dari server
  const takeAllArticles = async () => {
    try {
      const request = await (await fetch('http://localhost:8000/api/articles')).json();
      setListOfArticles(request.data);
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  useEffect(() => takeAllArticles(), []);

  const Components = () => ({
    articleCards({ data }) {
      return (
        <div className="articledashCard">
          <Link to={`/articles/${data.url}`} className="link title"><h3>{data.title}</h3></Link>
          <p className="description">{data.description}</p>
          <div className="cardInfo">
            <p className="author">{data.author}</p>
            <span></span>
            <p className="time">{moment(data.createdAt).locale('id').fromNow()}</p>
          </div>
        </div>
      );
    },
  });

  const ArticleCards = Components().articleCards;

  return (
    <div className="articledashList">
      {
        listOfArticles.map((data) => <ArticleCards data={data} key={data._id} />)
      }
    </div>
  );
}

export default ListArticle;
