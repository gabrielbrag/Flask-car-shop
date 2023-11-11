import unittest
from flask_testing import TestCase
from app import create_app 
from models import db, Brand
from flask_jwt_extended import create_access_token

class test_brand_blueprint(TestCase):

    def create_app(self):
        return create_app(testing=True)

    def setUp(self):
        db.drop_all()
        db.create_all()
        self.brand = Brand(name='Test Brand')
        db.session.add(self.brand)
        db.session.commit()
        self.access_token = create_access_token(1)
        self.headers = {
            'Authorization': f'Bearer {self.access_token}'
        }

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_get_brands(self):
        response = self.client.get('/brands', headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, [{'id': self.brand.id, 'name': self.brand.name}])
        
    def test_get_brand(self):
        response = self.client.get(f'/brands/{self.brand.id}', headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'id': self.brand.id, 'name': self.brand.name})
        
    def test_create_brand(self):
        response = self.client.post('/brands', json={'name': 'New Brand'}, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'id': 2, 'name': 'New Brand'})

    def test_update_brand(self):
        response = self.client.put(f'/brands/{self.brand.id}', json={'name': 'Updated Brand'}, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'id': self.brand.id, 'name': 'Updated Brand'})

    def test_delete_brand(self):
        response = self.client.delete(f'/brands/{self.brand.id}', headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, f"Brand deleted: id {self.brand.id}")

if __name__ == '__main__':
    unittest.main()