export const Header = () => {

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-color fixed-top">
      <nav className="container-fluid nav-content">
        <a className="navbar-brand textColorSecondary" href="/">
          <h2 className='textColorSecondary'><i className="fa fa-lg fa-car"></i>{process.env.REACT_APP_COMPANY_NAME}</h2>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {process.env.REACT_APP_COMPANY_WHATSAPP_NUMBER && (
              <li className="nav-item">
                <button type="button" className="btn btn-motors" onClick={() => window.open(`https://api.whatsapp.com/send?phone=55${process.env.REACT_APP_COMPANY_WHATSAPP_NUMBER}`, '_blank')}>
                  <i className="fab fa-whatsapp me-2 font-weight-bold"></i>
                  Entre em contato
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};
