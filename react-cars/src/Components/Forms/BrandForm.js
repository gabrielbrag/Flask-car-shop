import React, { useState, useEffect } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import AdminMasterPage from '../AdminMasterPage';
import createOrUpdateBrand from '../../Controllers/Brands/createOrUpdateBrand';
import getBrands from '../../Controllers/Brands/getBrands';

function BrandForm() {
  const [brandName, setBrandName] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBrand = async () => {
      if (id) {
        const brand = await getBrands(id);
        setBrandName(brand.name);
      }
    };
    fetchBrand();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createOrUpdateBrand(id, brandName);
      navigate(-1);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <AdminMasterPage>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="brandName" className="form-label">Marca</label>
          <input 
            type="text" 
            className="form-control" 
            id="brandName" 
            value={brandName}
            onChange={e => setBrandName(e.target.value)}
          />
          <button type="submit" className="btn btn-primary mt-3">Salvar</button>
        </div>
      </form>
    </AdminMasterPage>
  );
}

export default BrandForm;