import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminMasterPage from '../AdminMasterPage';
import getVehicles from '../../Controllers/Vehicles/getVehicles';
import getVehiclePhoto from '../../Controllers/Vehicles/getVehiclePhoto';
import getBrands from '../../Controllers/Brands/getBrands';
import getModels from '../../Controllers/Models/getModels';
import createOrUpdateVehicle from '../../Controllers/Vehicles/createOrUpdateVehicle';

const VehicleForm = () => {
  const { id } = useParams();
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [fuelType, setFuelType] = useState('GAS');
  const [mileage, setMileage] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [photo, setPhoto] = useState(null);
  const [miniature, setMiniature] = useState(null);
  const [saleValue, setSaleValue] = useState('');
  const [transmission, setTransmission] = useState('A');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      const brands = await getBrands();
      setBrands(brands);
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      if (brand) {
        const models = await getModels(0, brand);
        setModels(models);
      }else{
        setModels([]);
      }
    };
    fetchModels();
  }, [brand]);

  useEffect(() => {
    if (id) {
      getVehicles(id).then(vehicle => {
        setBrand(vehicle.brand_id);
        setModel(vehicle.model_id);
        setFuelType(vehicle.fuel_type);
        setMileage(vehicle.mileage);
        setModelYear(vehicle.model_year);
        setPhoto(vehicle.photo);
        setSaleValue(vehicle.sale_value);
        setTransmission(vehicle.transmission);

        getVehiclePhoto(id).then(photo => {
          setMiniature(photo);
        });
      });
    }
  }, [id]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const base64String = reader.result.replace('data:', '')
        .replace(/^.+,/, '');
      setPhoto(base64String);
    }

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!brand || !model || !fuelType || !mileage || !modelYear || !saleValue || !transmission) {
      alert('Por favor preencha todos os campos');
      return;
    }
    
    const vehicle = {
      id,
      fuel_type: fuelType,
      mileage,
      model_id: model,
      model_year: modelYear,
      photo,
      sale_value: saleValue,
      transmission,
    };
    await createOrUpdateVehicle(vehicle);
    navigate(-1);
  };

  const currentYear = new Date().getFullYear();

  return (
    <AdminMasterPage>
      <form onSubmit={handleSubmit}>
      {miniature && <img style={{ maxHeight: '20vh' }} className='mt-3' src={miniature} alt="Vehicle" />}
        <div className='row mt-3'>
          <div className="mb-3 col-md-6">
            <label htmlFor="brand" className="form-label">Marca</label>
            <select 
              className="form-select" 
              id="brand" 
              value={brand || ''} 
              onChange={e => setBrand(e.target.value)} 
            >
              <option value="">Selecione uma marca</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand.id}>{brand.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="model" className="form-label">Modelo</label>
            <select 
              className="form-select" 
              id="model" 
              value={model || ''} 
              onChange={e => setModel(e.target.value)} 
              disabled={!brand || !Array.isArray(models) || models.length <= 0}
            >
              <option value="">Selecione um modelo</option>
              {Array.isArray(models) && models.map((model, index) => (
                <option key={index} value={model.id}>{model.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-md-4">
            <label htmlFor="modelYear" className="form-label">Ano do Modelo</label>
            <input type="number" className="form-control" id="modelYear" value={modelYear} onChange={e => setModelYear(e.target.value)} min="1900" max={currentYear} />
          </div>

          <div className="mb-3 col-md-4">
            <label htmlFor="mileage" className="form-label">Quilometragem</label>
            <input type="number" className="form-control" id="mileage" value={mileage} onChange={e => setMileage(e.target.value)} />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="fuelType" className="form-label">Tipo de Combustível</label>
            <select 
              className="form-select" 
              id="fuelType" 
              value={fuelType} 
              onChange={e => setFuelType(e.target.value)} 
            >
              <option value="GAS">Gasolina</option>
              <option value="ETH">Etanol</option>
              <option value="FLE">Flex</option>
              <option value="DIE">Diesel</option>
              <option value="ELE">Elétrico</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-md-4">
            <label htmlFor="saleValue" className="form-label">Valor de Venda</label>
            <input type="number" className="form-control" id="saleValue" value={saleValue} onChange={e => setSaleValue(e.target.value)} />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="transmission" className="form-label">Câmbio</label>
            <select 
              className="form-select" 
              id="transmission" 
              value={transmission} 
              onChange={e => setTransmission(e.target.value)} 
            >
              <option value="A">Automático</option>
              <option value="M">Manual</option>
            </select>
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="photo" className="form-label">Foto</label>
            <input type="file" className="form-control" id="photo" 
              onClick={(e) => e.target.value = null} // added this line to reset the input value
              onChange={ e => {
                if (photo && !window.confirm('Você tem certeza que quer substituir a foto atual?')) {
                  return;
                }
                return handleFileChange(e)} } />
            </div>
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </ AdminMasterPage>
  );
};

export default VehicleForm;