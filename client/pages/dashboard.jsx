import React from 'react';
import '../styles/pages/dashboard.scss';
import ArticleDash from '../containers/dashboard/article.dash';

function Dashboard({ isLoggedIn }) {
  return (
    <div className="dashboard">
      <div className="dashboardWrap">
        <ArticleDash isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}

export default Dashboard;
