import postLogin from './postLogin';

async function setUserSession(username, password) {
    let access_token = await postLogin(username, password);
    if (access_token) {
      sessionStorage.setItem('access_token', access_token);
      sessionStorage.setItem('username', username);
      window.location.href = '/admin/vehicles';
    }else{
        alert("Usuário ou senha inválidos!")
    }
  }
  
export default setUserSession;