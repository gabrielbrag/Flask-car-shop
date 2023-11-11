import getAccessToken from '../../../Controllers/Login/getAccessToken';

describe('getAccessToken', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should return the access token when it exists in sessionStorage', () => {
    const mockToken = 'token';
    sessionStorage.setItem('access_token', mockToken);

    const result = getAccessToken();

    expect(result).toBe(mockToken);
  });

  it('should return an empty string when the access token does not exist in sessionStorage', () => {
    const result = getAccessToken();

    expect(result).toBe('');
  });
});