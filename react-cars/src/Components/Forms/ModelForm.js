import React, { useState, useEffect } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import AdminMasterPage from '../AdminMasterPage';
import createOrUpdateModel from '../../Controllers/Models/createOrUpdateModel';
import getBrands from '../../Controllers/Brands/getBrands';
import getModels from '../../Controllers/Models/getModels';

function ModelForm() {
  const [modelName, setModelName] = useState('');
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBrandsAndModel = async () => {
      const brandsData = await getBrands();
      setBrands(brandsData);
      if (brandsData.length > 0) {
        setSelectedBrand(brandsData[0].id);
      }
      if (id) {
        const model = await getModels(id);
        setModelName(model.name);
        setSelectedBrand(model.brand_id);
      }
    };
    fetchBrandsAndModel();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createOrUpdateModel(id, selectedBrand, modelName);
      navigate(-1);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <AdminMasterPage>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">Marca</label>
          <select 
            id="brand" 
            className="form-control" 
            value={selectedBrand}
            onChange={e => setSelectedBrand(e.target.value)}
          >
            {brands.map(brand => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
          <label htmlFor="modelName" className="form-label">Nome do modelo</label>
          <input 
            type="text" 
            className="form-control" 
            id="modelName" 
            value={modelName}
            onChange={e => setModelName(e.target.value)}
          />
          <button type="submit" className="btn btn-primary mt-3">Salvar</button>
        </div>
      </form>
    </AdminMasterPage>
  );
}

export default ModelForm;