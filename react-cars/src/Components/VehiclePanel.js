import React, { useEffect, useState }  from 'react';
import getVehicles from '../Controllers/Vehicles/getVehicles';
import getVehiclePhoto from '../Controllers/Vehicles/getVehiclePhoto';

const VehicleCard = ({ vehicle }) => {
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    const fetchPhoto = async () => {
      const photoData = await getVehiclePhoto(vehicle.id);
      setPhoto(photoData);
    };

    fetchPhoto();
  }, [vehicle.id]);
  
  return (
    <div className="car-card" style={{ borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', transition: '0.3s', '&:hover': { boxShadow: '0px 0px 20px rgba(0,0,0,0.15)' } }}>
      <div className="row box-vehicle-result no-padding no-margin">
        <div className="car-img col-md-12 no-padding fit-col-img d-flex justify-content-center">
          <img alt={vehicle.model_name} src={photo} className="img-responsive vehicle-card-img" />
        </div>
        <div className="car-info col-md-12">
          <div className="row">
              <div className="col-md-12 pact-result">
                <div className="year">{vehicle.model_year}</div>
                  <div className="first-name">{vehicle.model_name}</div>
                  <h3 className="price indigo-text text-darken-4">R$
                      {vehicle.sale_value_formatted}
                  </h3>
                  <div className="optionals">
                      <div className="box-optionals-home">
                          <div>
                              <i className="fa fa-cog fa-xl"></i>
                          </div>
                          <div>
                              {vehicle.transmission_formatted}
                          </div>
                      </div>
                      <div className="box-optionals-home">
                          <div>
                              <i className="fa fa-gauge fa-xl"></i>
                          </div>
                          <div>
                              {vehicle.mileage_formatted}
                          </div>
                      </div>
                      <div className="box-optionals-home">
                          <div>
                              <i className="fa fa-tint fa-xl"></i>
                          </div>
                          <div>
                              <span className="fuel-type-text">{vehicle.fuel_type_formatted}</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
)};

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const vehiclesData = await getVehicles();
      setVehicles(vehiclesData);
    };

    fetchVehicles();
  }, []);

  return (
    <div className="car-card-container">
      {vehicles.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}
    </div>
  );
};

const Home = () => (
  <div>
    <VehicleList />
  </div>
);

export default Home;
