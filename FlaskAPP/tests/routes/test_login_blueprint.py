import unittest
from flask_testing import TestCase
from app import create_app 
from models import db, User
from werkzeug.security import generate_password_hash

class test_login_blueprint(TestCase):

    def create_app(self):
        return create_app(testing=True)

    def setUp(self):
        db.drop_all()
        db.create_all()
        self.user = User(username='testuser', password=generate_password_hash('testpassword'))
        db.session.add(self.user)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_login(self):
        login_data = {'username': 'testuser', 'password': 'testpassword'}
        response = self.client.post('/login', json=login_data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('access_token', response.json)

    def test_login_fail(self):
        login_data = {'username': 'wronguser', 'password': 'wrongpassword'}
        response = self.client.post('/login', json=login_data)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json, {"msg": "Bad username or password"})

if __name__ == '__main__':
    unittest.main()