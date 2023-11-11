import fetchWithToken from "../Login/fetchWithToken";

const createOrUpdateVehicle = async (vehicle) => {
    let http_method = '';
    let request_url = '';
    
    if (vehicle.id) {
      http_method = 'PUT';
      request_url = `${process.env.REACT_APP_VEHICLES_API_HOST}/vehicles/${vehicle.id}`;
    } else {
      http_method = 'POST';
      request_url = `${process.env.REACT_APP_VEHICLES_API_HOST}/vehicles`;
    }
  
    try {
        const response = fetchWithToken(request_url, http_method, JSON.stringify(vehicle))
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
  export default createOrUpdateVehicle;