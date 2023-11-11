import fetchWithToken from "../Login/fetchWithToken";

const deleteBrand = async (id) => {
    try {
      const requestUrl = `${process.env.REACT_APP_VEHICLES_API_HOST}/brands/${id}`;
  
      const response = await fetchWithToken(requestUrl, 'DELETE', null)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return true;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  export default deleteBrand;