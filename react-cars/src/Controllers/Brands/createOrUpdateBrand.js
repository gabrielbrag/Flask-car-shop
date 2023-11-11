import fetchWithToken from "../Login/fetchWithToken";

const createOrUpdateBrand = async (brandid, brandName) => {
  let http_method = '';
  let request_url = '';
  
  if (brandid) {
    http_method = 'PUT';
    request_url = `${process.env.REACT_APP_VEHICLES_API_HOST}/brands/${brandid}`;
  } else {
    http_method = 'POST';
    request_url = `${process.env.REACT_APP_VEHICLES_API_HOST}/brands`;
  }

  try {
      const response = await fetchWithToken(request_url, http_method, JSON.stringify({ name: brandName }))
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
export default createOrUpdateBrand;