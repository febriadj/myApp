import React from 'react';

function FormSearch({ handleChange, handleCloseSearchTab }) {
  return (
    <div className="formsearch">
      <div className="formsearchHeader">
        <h1 className="title">Find the Article You Want to Read.</h1>
        <button type="button" onClick={handleCloseSearchTab}>
          <span className="strip strip-1"></span>
          <span className="strip strip-2"></span>
        </button>
      </div>
      <input
        type="text"
        name="title"
        placeholder="Enter Something"
        required
        onChange={handleChange}
      />
    </div>
  );
}

export default FormSearch;
