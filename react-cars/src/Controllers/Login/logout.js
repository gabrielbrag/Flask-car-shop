
function logout() {
    sessionStorage.clear();
    window.location.href = '/admin/login';
  }

export default logout;