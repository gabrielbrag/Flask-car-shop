import unittest
from flask_testing import TestCase
from app import create_app 
from models import db, VehicleModel, Brand
from flask_jwt_extended import create_access_token

class test_model_blueprint(TestCase):

    def create_app(self):
        return create_app(testing=True)
    
    def setUp(self):
        db.drop_all()
        db.create_all()
        self.brand = Brand(name='Test Brand')
        db.session.add(self.brand)
        db.session.commit()
        
        self.brand2 = Brand(name='Test Brand2')
        db.session.add(self.brand2)
        db.session.commit()
        
        self.model = VehicleModel(name='Test Model', brand_id=self.brand.id)
        db.session.add(self.model)
        db.session.commit()
        
        self.model2 = VehicleModel(name='Test Model2', brand_id=self.brand2.id)
        db.session.add(self.model2)
        db.session.commit()
        
        self.access_token = create_access_token(1)
        self.headers = {
            'Authorization': f'Bearer {self.access_token}'
        }

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_get_models(self):
        response = self.client.get('/models', headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json[0]['id'], self.model.id)
        self.assertEqual(response.json[0]['name'], self.model.name)
        self.assertEqual(response.json[0]['brand_id'], self.model.brand_id)
        self.assertEqual(response.json[0]['brand_name'], self.brand.name)
        self.assertEqual(response.json[1]['id'], self.model2.id)
        self.assertEqual(response.json[1]['name'], self.model2.name)
        self.assertEqual(response.json[1]['brand_id'], self.model2.brand_id)
        self.assertEqual(response.json[1]['brand_name'], self.brand2.name)
            
    def test_get_models_by_brand(self):
        response = self.client.get('/models?brand_id=2', headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json[0]['id'], self.model2.id)
        self.assertEqual(response.json[0]['name'], self.model2.name)
        self.assertEqual(response.json[0]['brand_id'], self.model2.brand_id)
        self.assertEqual(response.json[0]['brand_name'], self.brand2.name)

    def test_get_model(self):
        response = self.client.get(f'/models/{self.model.id}', headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['id'], self.model.id)
        self.assertEqual(response.json['name'], self.model.name)
        self.assertEqual(response.json['brand_id'], self.model.brand_id)
        self.assertEqual(response.json['brand_name'], self.brand.name)
        
    def test_create_model(self):
        model_data = {'name': 'New Model', 'brand_id': self.brand.id, 'brand_name': self.brand.name}
        response = self.client.post('/models', json=model_data, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['name'], model_data['name'])
        self.assertEqual(response.json['brand_id'], model_data['brand_id'])
        self.assertEqual(response.json['brand_name'], model_data['brand_name'])

    def test_create_model_with_invalid_brand_id(self):
        model_data = {'name': 'New Model', 'brand_id': 100, 'brand_name': 'Invalid Brand'}
        response = self.client.post('/models', json=model_data, headers=self.headers)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {'message': 'Invalid brand_id'})

    def test_update_model(self):
        model_data = {'name': 'Updated Model', 'brand_id': self.brand.id, 'brand_name': self.brand.name}
        response = self.client.put(f'/models/{self.model.id}', json=model_data, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['name'], model_data['name'])
        self.assertEqual(response.json['brand_id'], model_data['brand_id'])
        self.assertEqual(response.json['brand_name'], model_data['brand_name'])

    def test_delete_model(self):
        response = self.client.delete(f'/models/{self.model.id}', headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, f"Model deleted: id {self.model.id}")

if __name__ == '__main__':
    unittest.main()