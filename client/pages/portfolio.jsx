import React, { useState, useEffect } from 'react';
import '../styles/pages/portfolio.scss';

import Footer from '../containers/footer';

function Portfolio() {
  const [docTitle, setDocTitle] = useState(document.title);

  const handleDocTitle = () => setDocTitle('Febx - Home');

  useEffect(() => {
    document.title = docTitle;
    handleDocTitle();
  }, [docTitle]);

  return (
    <React.Fragment>
      <div className="portfolio">
        <div className="portfolio_wrap">

          <div className="header">
            <div className="header_intro">
              <span className="strip"></span>
              <p className="paragraf">Introduction</p>
            </div>
            <div className="title">Hi, I Am Febriadji</div>
            <p className="paragraf paragraf-1">Junior FullStack Web Developer</p>
          </div>

          <div className="skills">
            <div className="skills_text">
              <div className="skills_text_header">
                <h2 className="title">My Current Skills</h2>
                <p>
                  My daily life as a web developer started in mid-2020,
                  and so far I have mastered several languages, programming libraries/frameworks,
                  such as Javascript, Reactjs, Nodejs, Expressjs, SocketIO, Sass,
                  and a little bit familiar with TypeScript.
                  besides that I also mastered REST and GraphQL.
                </p>
              </div>
              <div className="skills_text_footer">
                <h2 className="title">Being Studied</h2>
                <div className="list">
                  <p className="paragraf">RabbitMQ</p>
                  <p className="paragraf">Payment Gateway</p>
                </div>
              </div>
            </div>
            <div className="skills_list">
              <div className="skills_card card-1">
                <p>JavaScript</p>
                <p>98%</p>
              </div>
              <div className="skills_card card-2">
                <p>Node.js</p>
                <p>95%</p>
              </div>
              <div className="skills_card card-3">
                <p>React.js</p>
                <p>89%</p>
              </div>
              <div className="skills_card card-4">
                <p>Express.js</p>
                <p>95%</p>
              </div>
              <div className="skills_card card-5">
                <p>MySql</p>
                <p>92%</p>
              </div>
              <div className="skills_card card-6">
                <p>MongoDB</p>
                <p>90%</p>
              </div>
              <div className="skills_card card-7">
                <p>GraphQL</p>
                <p>85%</p>
              </div>
              <div className="skills_card card-8">
                <p>Socket.io</p>
                <p>45%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Portfolio;
