import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './Components/Home';
import LoginForm from './Components/Forms/LoginForm';
import { BrandList, ModelList, VehiclesList } from './Components/EntityManager';
import BrandForm from './Components/Forms/BrandForm';
import ModelForm from './Components/Forms/ModelForm';
import VehicleForm from './Components/Forms/VehicleForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/admin/login" element={<LoginForm />} /> */
        <Route path="/" element={<Home />} />
        <Route path="/admin/brands" element={<BrandList />} />
        <Route path="/admin/models" element={<ModelList />} />
        <Route path="/admin/vehicles" element={<VehiclesList />} />
        <Route path="/admin/brands/update/:id" element={<BrandForm method="PUT" />} />
        <Route path="/admin/brands/delete/:id" element={<BrandForm />} />
        <Route path="/admin/brands/insert/" element={<BrandForm method="POST" />} />
        <Route path="/admin/models/update/:id" element={<ModelForm />} />
        <Route path="/admin/models/delete/:id" element={<ModelForm />} />
        <Route path="/admin/models/insert" element={<ModelForm />} />
        <Route path="/admin/vehicles/update/:id" element={<VehicleForm />} />
        <Route path="/admin/vehicles/delete/:id" element={<VehicleForm />} />
        <Route path="/admin/vehicles/insert" element={<VehicleForm />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
