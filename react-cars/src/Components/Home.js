import React from 'react';
import VehiclePanel from './VehiclePanel';
import '../Styling/Home.css';
import { Header } from './Header';



const Footer = () => (
  <footer className="text-light py-3 bg-color navbar-bottom-fixed">
    <div className="content">
      <div className="col-md-8">
        <p className="mb-0 textColorSecondary">
          <i className="fas fa-map-marker-alt me-2 textColorSecondary"></i>
          {process.env.REACT_APP_COMPANY_ADDRESS}
        </p>
      </div>
      <div>
        {process.env.REACT_APP_COMPANY_FACEBOOK_LINK && (
          <a href={process.env.REACT_APP_COMPANY_FACEBOOK_LINK}>
            <i className="fab fa-facebook me-3 textColorSecondary"></i>
          </a>
        )}
        {process.env.REACT_APP_COMPANY_INSTAGRAM_LINK && (
          <a href={process.env.REACT_APP_COMPANY_INSTAGRAM_LINK}>
            <i className="fab fa-instagram me-3 textColorSecondary"></i>
          </a>
        )}
        {process.env.REACT_APP_COMPANY_WHATSAPP_NUMBER && (
          <a href={`https://api.whatsapp.com/send?phone=55${process.env.REACT_APP_COMPANY_WHATSAPP_NUMBER}`}>
            <i className="fab fa-whatsapp me-2 textColorSecondary"></i>
          </a>
        )}
      </div>
    </div>
  </footer>
);

const Home = () => (
  <div>
    <Header />
    <div className="contentDiv">
      <div className="row m-0">
        <div id="vehiclesPanel" className="col-sx-12 col-lg-12 mb-5">
          <VehiclePanel />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Home;
