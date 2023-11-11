import fetchWithToken from "../Login/fetchWithToken";

const createOrUpdateModel = async (model_id, brand_id, model_name) => {
    let http_method = '';
    let request_url = '';
    
    if (model_id) {
      http_method = 'PUT';
      request_url = `${process.env.REACT_APP_VEHICLES_API_HOST}/models/${model_id}`;
    } else {
      http_method = 'POST';
      request_url = `${process.env.REACT_APP_VEHICLES_API_HOST}/models`;
    }
  
    try {
      const response = await fetchWithToken(request_url, http_method, JSON.stringify({ name: model_name, brand_id: brand_id }))
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
        
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  export default createOrUpdateModel;