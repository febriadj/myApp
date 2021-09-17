import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function Result({ listOfArticles }) {
  const Components = () => ({
    result({ data }) {
      return (
        <div className="domresultCard">
          <div className="tags">
            {
              data.tags.map((item, index) => <Link to={`/articles?tags=${item}`} className="link linkTags" key={index}>{item}</Link>)
            }
          </div>
          <Link to={`articles/${data.url}`} className="link linkTitle"><h2>{data.title}</h2></Link>
          <p className="description">{data.description}</p>
          <p className="time">{moment(data.createdAt).locale('en-US').fromNow()}</p>
        </div>
      );
    },
  });

  const ResultComponent = Components().result;

  return (
    <div className="domresult">
      {
        listOfArticles.map((data) => <ResultComponent data={data} key={data._id} />)
      }
    </div>
  );
}

export default Result;