import React, { useEffect } from 'react';
import logout from '../Controllers/Login/logout';
import { Sidebar } from './Sidebar';
import { useNavigate } from 'react-router-dom';
import getAccessToken from '../Controllers/Login/getAccessToken';

const AdminMasterPage = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      navigate('/admin/login')
    }
  }, [navigate]);

  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <nav className="navbar navbar-light bg-background-secondary shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand brand-title" href="/">
            <p className="primary title-bar"><i className="fas fa-car"></i>{process.env.REACT_APP_COMPANY_NAME}</p>
          </a>
          <button className="navbar-toggler" type="button" aria-label="Toggle navigation" onClick={() => setOpen(o => !o)}>
            <i className="fas fa-arrow-right" style={{ color: 'var(--primary)' }}></i>
          </button>
          <div className="flex-login">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle primary auth-controls" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-user"></i>
                  {sessionStorage.getItem('username')}
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><button className="dropdown-item" onClick={logout}>Logoff</button></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="admin-container">
        <Sidebar open={open} />
        <main className="admin-wrapper">
          {children} { }
        </main>
      </div>
    </div>
  );
}

export default React.memo(AdminMasterPage);
