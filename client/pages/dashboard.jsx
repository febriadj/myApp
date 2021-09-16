import React from 'react';
import '../styles/pages/dashboard.scss';
import ArticleDash from '../containers/dashboard/article.dash';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboardWrap">
        <ArticleDash />
      </div>
    </div>
  );
}

export default Dashboard;
