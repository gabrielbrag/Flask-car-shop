import fetchWithToken from "../Login/fetchWithToken";

const getVehiclePhoto = async (id) => {
    try {
      const requestUrl = `${process.env.REACT_APP_VEHICLES_API_HOST}/vehicles/${id}/photo`;
  
      const response = await fetchWithToken(requestUrl, 'GET', null)
      const data = await response.text(); // Use .text() if the API returns a base64 string
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  export default getVehiclePhoto;