import React, { useState, useRef } from 'react';

function FormArticle({ tokenAuth }) {
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

      const request = await (await fetch('http://localhost:8000/api/articles', {
        method: 'post',
        headers: {
          Authorization: `Bearer ${tokenAuth}`,
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
    }
    catch (error0) {
      setNotif(error0.message);
    }
  }

  const NotifComponent = () => {
    if (notif === null) return null;

    const closeNotif = () => setNotif(null);

    return (
      <div className="notif">
        <div className="notifWrap">
          <p>{notif}</p>
          <button type="button" onClick={closeNotif}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="articledashForm">
      <div className="articledashFormHeader">
        <NotifComponent />
        <h2 className="title">Create Your Article.</h2>
        <span></span>
        <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
          <input
            className="input inputTitle"
            type="text"
            name="title"
            placeholder="What is the title of the Article?"
            required
            onChange={handleChange}
            value={formBody.title}
          />
          <input
            className="input inputDescription"
            type="text"
            name="description"
            placeholder="Enter a short description for the Article"
            required
            onChange={handleChange}
            value={formBody.description}
          />
          <input
            className="input inputTags"
            type="text"
            name="tags"
            placeholder="Give some tags"
            required
            onChange={handleChange}
            value={formBody.tags}
          />
          <input
            className="input inputFileContent"
            type="file"
            name="fileContent"
            required
            onChange={handleSetFile}
            ref={fileContentValue}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="articledashFormFooter">
        <p>&copy; 2021 Mr.Febx</p>
      </div>
    </div>
  );
}

export default FormArticle;
