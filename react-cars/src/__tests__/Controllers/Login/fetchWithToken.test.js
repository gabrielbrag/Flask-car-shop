import getAccessToken from '../../../Controllers/Login/getAccessToken';
import fetchWithToken from '../../../Controllers/Login/fetchWithToken';

jest.mock('../../../Controllers/Login/getAccessToken');
global.fetch = jest.fn();

describe('fetchWithToken', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should call fetch with correct arguments', async () => {
    const mockUrl = 'http://example.com';
    const mockMethod = 'GET';
    const mockBody = JSON.stringify({ key: 'value' });
    const mockToken = 'token';
    getAccessToken.mockReturnValue(mockToken);
    global.fetch.mockResolvedValue({
      status: 200,
      json: () => Promise.resolve({}),
    });

    await fetchWithToken(mockUrl, mockMethod, mockBody);

    expect(fetch).toHaveBeenCalledWith(mockUrl, {
      method: mockMethod,
      headers: {
        'Authorization': `Bearer ${mockToken}`,
        'Content-Type': 'application/json',
      },
      body: mockBody,
    });
  });
});