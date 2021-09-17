import React, { useEffect, useState } from 'react';
import '../styles/containers/search.scss';

import FormSearch from '../components/search/form.search';
import Result from '../components/search/result.search';
import JsonResult from '../components/search/jsonresult.search';

function Search({ styles, handleCloseSearchTab }) {
  const [listOfArticles, setListOfArticles] = useState([]);

  const handleFindAllArticles = async () => {
    const request = await (await fetch('http://localhost:8000/api/articles')).json();
    setListOfArticles(request.data);
  }

  const handleChange = async (event) => {
    try {
      const { value } = event.target;

      if (value.length === 0) return handleFindAllArticles();

      const request = await (await fetch(`http://localhost:8000/api/articles?title=${value}`)).json();
      return setListOfArticles(request.data);
    }
    catch (error0) {
      return console.error(error0.message);
    }
  }

  useEffect(() => handleFindAllArticles(), []);

  return (
    <div className="search" style={styles}>
      <div className="searchWrap">
        <div className="searchMain">
          <FormSearch
            handleCloseSearchTab={() => handleCloseSearchTab()}
            handleChange={(event) => handleChange(event)}
          />
          <div className="result">
            <Result listOfArticles={listOfArticles} />
            <JsonResult listOfArticles={listOfArticles} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
