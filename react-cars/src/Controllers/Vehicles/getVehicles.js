import fetchWithToken from "../Login/fetchWithToken";

const getVehicles = async (id) => {
  try {
    let requestUrl = "";
    if(id){
      requestUrl= `${process.env.REACT_APP_VEHICLES_API_HOST}/vehicles/${id}`;
    }else{
      requestUrl= `${process.env.REACT_APP_VEHICLES_API_HOST}/vehicles`;
    }

    const response = await fetchWithToken(requestUrl, 'GET', null)
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export default getVehicles;