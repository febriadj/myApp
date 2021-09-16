import React from 'react';
import '../../styles/containers/routetab.scss';

function Routetab() {
  return (
    <div className="routetab">
      <div className="routetabWrap">
        <div className="routetabRoute">
          <button type="submit">Create New Article</button>
          <button type="submit">Create New Project</button>
        </div>
        <button type="submit" className="logout">Logout</button>
      </div>
    </div>
  );
}

export default Routetab;
