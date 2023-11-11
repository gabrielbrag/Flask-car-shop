import unittest
from flask_testing import TestCase
from app import create_app 
from models import db, Vehicle, VehicleModel
from flask_jwt_extended import create_access_token


class test_vehicle_blueprint(TestCase):

    def create_app(self):
        return create_app(testing=True)


    def setUp(self):
        db.drop_all()
        db.create_all()
        self.vehicle_model = VehicleModel(name='Test Model', brand_id=1)
        db.session.add(self.vehicle_model)
        db.session.commit()
        
        self.vehicle_model2 = VehicleModel(name='Test Model2', brand_id=3)
        db.session.add(self.vehicle_model2)
        db.session.commit()
        
        self.vehicle = Vehicle(model_id=self.vehicle_model.id, transmission='A', fuel_type='GAS', sale_value=10000, mileage=1000, model_year=2020)
        db.session.add(self.vehicle)
        self.vehicle2 = Vehicle(model_id=self.vehicle_model2.id, transmission='M', fuel_type='ETH', sale_value=45000, mileage=70000, model_year=2022)
        db.session.add(self.vehicle2)
        db.session.commit()
        
        self.access_token = create_access_token(1)
        self.headers = {
            'Authorization': f'Bearer {self.access_token}'
        }

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_get_vehicles(self):
        response = self.client.get('/vehicles', headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, [self.vehicle.to_dict(), self.vehicle2.to_dict()])

    def test_get_vehicle(self):
        response = self.client.get(f'/vehicles/{self.vehicle.id}', headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, self.vehicle.to_dict())
        
    def test_create_vehicle(self):
        vehicle_data = {'model_id': self.vehicle_model.id, 'transmission': 'M', 'fuel_type': 'ETH', 'sale_value': 20000, 'mileage': 2000, 'model_year': 2021}
        response = self.client.post('/vehicles', json=vehicle_data, headers=self.headers)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json['model_id'], vehicle_data['model_id'])
        self.assertEqual(response.json['transmission'], vehicle_data['transmission'])
        self.assertEqual(response.json['fuel_type'], vehicle_data['fuel_type'])
        self.assertEqual(response.json['sale_value'], vehicle_data['sale_value'])
        self.assertEqual(response.json['mileage'], vehicle_data['mileage'])
        self.assertEqual(response.json['model_year'], vehicle_data['model_year'])
                
    def test_update_vehicle(self):
        vehicle_data = {'model_id': self.vehicle_model.id, 'transmission': 'M', 'fuel_type': 'ETH', 'sale_value': 20000, 'mileage': 2000, 'model_year': 2021}
        response = self.client.put(f'/vehicles/{self.vehicle.id}', json=vehicle_data, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['model_id'], vehicle_data['model_id'])
        self.assertEqual(response.json['transmission'], vehicle_data['transmission'])
        self.assertEqual(response.json['fuel_type'], vehicle_data['fuel_type'])
        self.assertEqual(response.json['sale_value'], vehicle_data['sale_value'])
        self.assertEqual(response.json['mileage'], vehicle_data['mileage'])
        self.assertEqual(response.json['model_year'], vehicle_data['model_year'])

    def test_delete_vehicle(self):
        response = self.client.delete(f'/vehicles/{self.vehicle.id}', headers=self.headers)
        self.assertEqual(response.status_code, 200)
        
        nonexistent_vehicle = db.session.get(Vehicle, self.vehicle.id)
        self.assertIsNone(nonexistent_vehicle)

if __name__ == '__main__':
    unittest.main()