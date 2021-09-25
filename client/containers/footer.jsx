import React from 'react';
import '../styles/containers/footer.scss';

function Footer() {
  return (
    <div className="footer_app">
      <div className="footer_app_wrap">
        <div className="contact">
          <p>Let's Work Together</p>
          <div className="contact_main">
            <a
              href="https://api.whatsapp.com/phone?no=6285156703982"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              <div className="link_wrap">
                <p>iamfebriadji@gmail.com</p>
                <span className="strips strip-1"></span>
                <span className="strips strip-2"></span>
              </div>
            </a>
            <a
              href="https://api.whatsapp.com/phone?no=6285156703982"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              <div className="link_wrap">
                <p>+62 851-5670-3982</p>
                <span className="strips strip-1"></span>
                <span className="strips strip-2"></span>
              </div>
            </a>
          </div>
          <p>Jakarta, INA</p>
        </div>
        <div className="media">
          <div className="media_wrap">
            <a
              href="https://www.linkedin.com/in/febri-adji/"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              <div className="link_wrap">
                <p>Linkedin</p>
                <span className="strips strip-1"></span>
                <span className="strips strip-2"></span>
              </div>
            </a>
            <a
              href="https://instagram.com/febriadj"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              <div className="link_wrap">
                <p>Instagram</p>
                <span className="strips strip-1"></span>
                <span className="strips strip-2"></span>
              </div>
            </a>
            <a
              href="https://github.com/febriadj"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              <div className="link_wrap">
                <p>Github</p>
                <span className="strips strip-1"></span>
                <span className="strips strip-2"></span>
              </div>
            </a>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; Mr. Febx 2021. All right reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
