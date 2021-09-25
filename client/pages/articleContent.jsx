import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import MarkdownView from 'react-showdown';
import Prism from 'prismjs';

import '../styles/containers/prism.scss';
import '../styles/pages/articleContent.scss';
import Footer from '../containers/footer';

const isDev = process.env.NODE_ENV === 'development';

function ArticleContent() {
  const { url } = useParams();

  const [article, setArticle] = useState({
    author: '',
    title: '',
    description: '',
    tags: [],
    createdAt: '',
    content: '',
  });

  const handleFindArticle = async () => {
    try {
      const endpoint = isDev ? `http://localhost:8000/api/articles?url=${url}` : `/api/articles?url=${url}`;
      const request = await (await fetch(endpoint)).json();

      setArticle((prev) => ({
        ...prev,
        author: request.data.author,
        title: request.data.title,
        description: request.data.description,
        tags: request.data.tags,
        createdAt: request.data.createdAt,
        content: request.content,
      }));
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  useEffect(() => {
    document.title = `Febx - ${article.title}`
    handleFindArticle();

    Prism.highlightAll();
  }, [article.title]);

  return (
    <React.Fragment>
      <div className="article_content">
        <div className="article_content_wrap">

          <div className="content">
            <div className="header">
              <h1 className="title">{article.title}</h1>
              <p className="author">{article.author}</p>
              <p className="time">{moment(article.createdAt).format('dddd, DD MMMM YYYY, h:mm:ss a')}</p>
              <span className="strip"></span>
            </div>
            <MarkdownView markdown={article.content} />
          </div>

        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default ArticleContent;
