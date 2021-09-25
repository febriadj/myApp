import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function Result({ listOfArticles, handleOpenSearchBar }) {
  const handleSelectList = () => {
    setTimeout(() => {
      handleOpenSearchBar();
    }, 1000);
  }

  const Components = () => ({
    result({ data }) {
      return (
        <div className="dom_result_card">
          <div className="tags">
            {
              data.tags.map((item, index) => <Link to={`/articles?tags=${item}`} className="link link_tags" key={index}>{item}</Link>)
            }
          </div>
          <Link
            to={`/articles/${data.url}`}
            className="link title"
            onClick={handleSelectList}
          >
            {data.title}
          </Link>
          <p className="description">{data.description}</p>
          <p className="time">{moment(data.createdAt).locale('en-US').fromNow()}</p>
        </div>
      );
    },
  });

  const ResultComponent = Components().result;

  return (
    <div className="result">
      {
        listOfArticles.map((data) => <ResultComponent data={data} key={data._id} />)
      }
    </div>
  );
}

export default Result;
