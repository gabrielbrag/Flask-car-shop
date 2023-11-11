const postLogin = async (username, password) => {
  const http_method = 'POST';
  const request_url = `${process.env.REACT_APP_VEHICLES_API_HOST}/login`;

  try {
    const response = await fetch(request_url, {
      method: http_method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .catch(error => {
        console.error('Fetch error:', error);
        throw error;
      });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error:', error);
  }
};

export default postLogin;
