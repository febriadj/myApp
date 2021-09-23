import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const isDev = process.env.NODE_ENV === 'development';

function Result({ handleTakeAllArticles, listOfArticles }) {
  const [deleteData, setDeleteData] = useState({
    id: null, title: null,
  });

  const handleSelectList = async (event) => {
    try {
      const endpoint = isDev ? `http://localhost:8000/api/articles?id=${event.target.value}` : `/api/articles?id=${event.target.value}`;
      const request = await (await fetch(endpoint)).json();

      setDeleteData((prev) => ({
        ...prev,
        id: request.data[0]._id,
        title: request.data[0].title,
      }));
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  const handleDeleteList = async () => {
    try {
      const endpoint = isDev ? `http://localhost:8000/api/articles?delete=${deleteData.id}` : `/api/articles?delete=${deleteData.id}`;
      await (await fetch(endpoint, {
        method: 'delete',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGIwZmEwMTFlNjdlZWU5ZWFiMjgyNyIsImlhdCI6MTYzMjMyMDk0OX0.B9vfaaZHIZypCsv7quBgVYNSZSsWC73AMIZnTGTz8uU',
        },
      })).json();

      setDeleteData((prev) => ({
        ...prev, id: null, title: null,
      }));

      handleTakeAllArticles();
    }
    catch (error0) {
      console.error(error0.message);
    }
  }

  const handleCancelDelete = () => {
    setDeleteData((prev) => ({
      ...prev, id: null, title: null,
    }));
  }

  const Components = () => ({
    articleCards({ data }) {
      return (
        <div className="dasharticle_card">
          <div className="dasharticle_card_text">
            <div className="tags">
              {
                data.tags.map((item, index) => <Link to={`/articles?tags=${item}`} className="link link_tags" key={index}>{item}</Link>)
              }
            </div>
            <Link to={`/articles/${data.url}`} className="link title">{data.title}</Link>
            <p className="description">{data.description}</p>
            <p className="time">{moment(data.createdAt).locale('id').fromNow()}</p>
          </div>
          <button
            className="dasharticle_card_action delete_btn"
            type="submit"
            value={data._id}
            onClick={handleSelectList}
          >
            <div className="delete_btn_wrap">delete</div>
          </button>
        </div>
      );
    },

    deleteConfirm({ data }) {
      return (
        <div className="delete_confirm">
          <div className="delete_confirm_wrap">
            <div className="delete_data">
              <p className="paragraf id">{data.id}</p>
              <p className="paragraf title">{data.title}</p>
            </div>
            <div className="delete_ask">
              <p className="paragraf">Are you sure you want to delete it?</p>
              <div className="delete_ask_action">
                <button
                  className="link delete_btn"
                  type="submit"
                  onClick={handleDeleteList}
                >
                  <div className="link_wrap">
                    <p>Yes, sure</p>
                    <span className="strips strip-1"></span>
                    <span className="strips strip-2"></span>
                  </div>
                </button>
                <button
                  className="link cancel_btn"
                  type="button"
                  onClick={handleCancelDelete}
                >
                  <div className="link_wrap">
                    <p>Cancel</p>
                    <span className="strips strip-1"></span>
                    <span className="strips strip-2"></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    },
  });

  const ArticleCards = Components().articleCards;
  const DeleteConfirm = Components().deleteConfirm;

  return (
    <div className="dasharticle_result">
      {
        deleteData.id ? <DeleteConfirm data={deleteData} /> : null
      }
      {
        listOfArticles.map((data) => <ArticleCards data={data} key={data._id} />)
      }
    </div>
  );
}

export default Result;
