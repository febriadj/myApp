import React, { useEffect, useState } from 'react';
import '../styles/containers/search.scss';

import FormSearch from '../components/search/form.search';
import Result from '../components/search/result.search';

const isDev = process.env.NODE_ENV === 'development';

function Search({ styles, handleOpenSearchBar }) {
  const [listOfArticles, setListOfArticles] = useState([]);

  const handleFindAllArticles = async () => {
    const endpoint = isDev ? 'http://localhost:8000/api/articles' : '/api/articles';
    const request = await (await fetch(endpoint)).json();

    setListOfArticles(request.data);
  }

  const handleChange = async (event) => {
    try {
      const { value } = event.target;

      if (value.length === 0) return handleFindAllArticles();

      const endpoint = isDev ? `http://localhost:8000/api/articles?title=${value}` : `/api/articles?title=${value}`;
      const request = await (await fetch(endpoint)).json();

      return setListOfArticles(request.data);
    }
    catch (error0) {
      return console.error(error0.message);
    }
  }

  useEffect(() => handleFindAllArticles(), []);

  return (
    <div className="search" style={styles}>
      <div className="search_wrap">
        <div className="search_main">
          <FormSearch
            handleChange={(event) => handleChange(event)}
          />
          <Result
            handleOpenSearchBar={handleOpenSearchBar}
            listOfArticles={listOfArticles}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
