import React, { useState, useRef } from 'react';

const isDev = process.env.NODE_ENV === 'development';

function FormArticle({ isLoggedIn, handleTakeAllArticles }) {
  const [notif, setNotif] = useState(null);
  const fileContentValue = useRef();

  const [formBody, setFormBody] = useState({
    title: '',
    description: '',
    tags: '',
    fileContent: null,
  });

  const handleChange = (event) => {
    setFormBody((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSetFile = (event) => {
    setFormBody((prev) => ({
      ...prev,
      fileContent: event.target.files[0],
    }))
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();

      formData.append('title', formBody.title);
      formData.append('description', formBody.description);
      formData.append('tags', formBody.tags);
      formData.append('fileContent', formBody.fileContent);

      const endpoint = isDev ? 'http://localhost:8000/api/articles' : '/api/articles';
      const request = await (await fetch(endpoint, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${isLoggedIn.data.token}`,
        },
        body: formData,
      })).json();

      if (request.status === 'failed') {
        const newErr = {
          message: request.message,
        }
        throw newErr;
      }

      fileContentValue.current.value = '';

      setFormBody((prev) => ({
        ...prev, title: '', description: '', tags: '', fileContent: null,
      }));

      handleTakeAllArticles();
    }
    catch (error0) {
      setNotif(error0.message);
    }
  }

  const NotifComponent = () => {
    if (notif === null) return null;

    return (
      <div className="notif">
        <div className="notifWrap">
          <p>{notif}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dasharticle_form">
      <div className="dasharticle_form_wrap">
        <div className="dasharticle_form_header">
          <span className="strip"></span>
          <h2 className="title">Create A New Article.</h2>
        </div>
        <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
          <input
            className="input input_title"
            type="text"
            name="title"
            placeholder="What is the title of the Article?"
            required
            onChange={handleChange}
            value={formBody.title}
          />
          <input
            className="input input_description"
            type="text"
            name="description"
            placeholder="Enter a short description for the Article"
            required
            onChange={handleChange}
            value={formBody.description}
          />
          <input
            className="input input_tags"
            type="text"
            name="tags"
            placeholder="Give some tags"
            required
            onChange={handleChange}
            value={formBody.tags}
          />
          <input
            className="input input_file_content"
            type="file"
            name="fileContent"
            required
            onChange={handleSetFile}
            ref={fileContentValue}
          />
          <button type="submit">Submit</button>
          <NotifComponent />
        </form>
      </div>
    </div>
  );
}

export default FormArticle;
