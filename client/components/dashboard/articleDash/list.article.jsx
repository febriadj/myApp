import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function ListArticle({ listOfArticles }) {
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
