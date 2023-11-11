import postLogin from '../../../Controllers/Login/postLogin';
import setUserSession from '../../../Controllers/Login/setUserSession';

jest.mock('../../../Controllers/Login/postLogin');

describe('setUserSession', () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.resetAllMocks();
    delete window.location;
    window.location = { href: '' };
  });

  it('should set session storage and redirect when postLogin returns a token', async () => {
    const mockUsername = 'username';
    const mockPassword = 'password';
    const mockToken = 'token';
    postLogin.mockResolvedValue(mockToken);

    await setUserSession(mockUsername, mockPassword);

    expect(sessionStorage.getItem('access_token')).toBe(mockToken);
    expect(sessionStorage.getItem('username')).toBe(mockUsername);
    expect(window.location.href).toBe('/admin/vehicles');
  });

  it('should not set session storage or redirect when postLogin does not return a token', async () => {
    const mockUsername = 'username';
    const mockPassword = 'password';
    postLogin.mockResolvedValue(null);

    await setUserSession(mockUsername, mockPassword);

    expect(sessionStorage.getItem('access_token')).toBe(null);
    expect(sessionStorage.getItem('username')).toBe(null);
    expect(window.location.href).toBe('');
  });
});