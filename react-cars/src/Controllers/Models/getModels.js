import fetchWithToken from '../Login/fetchWithToken';

const getModels = async (model_id, brand_id) => {
  try {
    let requestUrl = "";
    if (model_id) {
      requestUrl = `${process.env.REACT_APP_VEHICLES_API_HOST}/models/${model_id}`;
    } else {
      requestUrl = `${process.env.REACT_APP_VEHICLES_API_HOST}/models`;
      if (brand_id) {
        requestUrl += `?brand_id=${brand_id}`;
      }
    }

    const response = await fetchWithToken(requestUrl, 'GET', null)

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export default getModels;
