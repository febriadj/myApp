import React from 'react';

function JsonResult({ listOfArticles }) {
  const Components = () => ({
    result({ data }) {
      return (
        <code>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </code>
      );
    },
  });

  const JsonResultComponent = Components().result;

  return (
    <div className="jsonresult">
      <div className="jsonresultWrap">
        {
          listOfArticles.map((data) => <JsonResultComponent data={data} key={data._id} />)
        }
      </div>
    </div>
  );
}

export default JsonResult;
