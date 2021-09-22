import React from 'react';

function FormSearch({ handleChange }) {
  return (
    <div className="form_search">
      <div className="form_search_header">
        <h1 className="title">Find the Article You Want to Read.</h1>
        <button type="button">
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
        autoComplete="off"
      />
    </div>
  );
}

export default FormSearch;
