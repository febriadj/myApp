import React, { useEffect } from 'react';
import '../../styles/containers/dashboard/article.dash.scss';

import FormArticle from '../../components/dashboard/articleDash/form.article';
import ListArticle from '../../components/dashboard/articleDash/list.article';

function ArticleDash({ isLoggedIn }) {
  useEffect(() => {
    document.title = 'Febx - Manage Your Article';
  });

  return (
    <div className="articledash">
      <FormArticle isLoggedIn={isLoggedIn} />
      <ListArticle />
    </div>
  );
}

export default ArticleDash;
