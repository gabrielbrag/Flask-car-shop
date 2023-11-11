import fetchWithToken from "../Login/fetchWithToken";

const deleteModel = async (id) => {
    try {
      const requestUrl = `${process.env.REACT_APP_VEHICLES_API_HOST}/models/${id}`;
  
      const response = await fetchWithToken(requestUrl, 'DELETE', null)
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return true;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  export default deleteModel;