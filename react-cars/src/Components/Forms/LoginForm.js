import React, { useState } from 'react';
import setUserSession from '../../Controllers/Login/setUserSession';
import '../../Styling/Admin.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserSession(username, password)
  };

  return (
    <div className="bg-background-secondary" style={{height:"100vh"}}>
      <section>
        <div className="container container-login">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center">
              <h1 className="primary title-bar mt-5 mb-3"><i className="fas fa-car me-1"></i>{ process.env.REACT_APP_COMPANY_NAME }</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 offset-md-3 mt-3">
              <form method="post" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="primary" htmlFor="id_username">Usuário</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    maxLength="150"
                    id="id_username"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="primary" htmlFor="id_password">Senha</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="id_password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;