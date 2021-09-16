import React, { useEffect, useState } from 'react';
import '../../styles/containers/dashboard/article.dash.scss';

import FormArticle from '../../components/dashboard/articleDash/form.article';
import ListArticle from '../../components/dashboard/articleDash/list.article';

function ArticleDash() {
  const [tokenAuth, setTokenAuth] = useState('');

  const handleSession = async () => {
    try {
      const request = await (await fetch('http://localhost:8000/api/admin/session')).json();

      if ('admin' in request.data === false) {
        const newErr = {
          message: 'Error detected while sending request to session',
        }
        throw newErr;
      }

      setTokenAuth(request.data.admin);
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  useEffect(() => {
    document.title = 'Febx - Manage Your Article';

    handleSession();
  });

  return (
    <div className="articledash">
      <FormArticle tokenAuth={tokenAuth} />
      <ListArticle />
    </div>
  );
}

export default ArticleDash;
