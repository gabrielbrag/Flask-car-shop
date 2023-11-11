import base64
from database import db
from database import db
from datetime import date
from sqlalchemy import Enum
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from flask_babel import format_decimal, format_number

class BaseModel(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
        
    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
            
class Brand(BaseModel):
    name = db.Column(db.String(100), nullable=False, unique=True)

    def __init__(self, name):
        self.name = name

class VehicleModel(BaseModel):
    __tablename__ = 'vehicleModel'
    
    name = db.Column(db.String(100), nullable=False, unique=True)
    brand_id = db.Column(db.Integer, db.ForeignKey('brand.id'))

    def __init__(self, name, brand_id):
        self.name = name
        self.brand_id = brand_id
        
    def to_dict(self):
        dictionary = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        brand = db.session.get(Brand, self.brand_id)
        if brand is not None:
            dictionary['brand_name'] = brand.name
            
        return dictionary

class Vehicle(BaseModel):
    TRANSMISSION_CHOICES = [
        ('A', 'Automático'),
        ('M', 'Manual'),
    ]
    FUEL_TYPE_CHOICES = [
        ('GAS', 'Gasolina'),
        ('ETH', 'Etanol'),
        ('FLE', 'Flex'),
        ('DIE', 'Diesel'),
        ('ELE', 'Elétrico')
    ]    
    
    model_id                = db.Column(db.Integer, db.ForeignKey('vehicleModel.id'))       
    transmission            = db.Column(Enum(*[choice[0] for choice in TRANSMISSION_CHOICES]))
    fuel_type               = db.Column(Enum(*[choice[0] for choice in FUEL_TYPE_CHOICES]))
    sale_value              = db.Column(db.Float, nullable=True, default=0)
    mileage                 = db.Column(db.Integer, default=0)
    model_year              = db.Column(db.Integer, default=date.today().year)
    photo                   = db.Column(db.LargeBinary, nullable=True);
    
    @property
    def sale_value_formatted(self):
        if self.sale_value is not None:
            return format_decimal(self.sale_value)
        return None

    @property
    def mileage_formatted(self):
        if self.mileage is not None:
            return format_number(self.mileage)
        return None

    @property
    def transmission_formatted(self):
        for choice in self.TRANSMISSION_CHOICES:
            if choice[0] == self.transmission:
                return choice[1]
        return ''

    @property
    def fuel_type_formatted(self):
        for choice in self.FUEL_TYPE_CHOICES:
            if choice[0] == self.fuel_type:
                return choice[1]
        return ''    
    
    def photo_link(self):
        if self.photo is None:
            return None
        
        return "data:image/png;base64," + str(base64.b64encode(self.photo))[2:-1]

    def __init__(self, **data):
        for key, value in data.items():
            setattr(self, key, value)    

    def to_dict(self):
        
        dictionary = {c.name: getattr(self, c.name) for c in self.__table__.columns if c.name != 'photo'}
        vehicleModel = db.session.get(VehicleModel, self.model_id)
        if vehicleModel is not None:
            dictionary['brand_id'] = vehicleModel.brand_id
            
            brand = db.session.get(Brand, vehicleModel.brand_id)
            if brand is not None:
                dictionary['brand_name'] = brand.name
                dictionary['model_name'] = f'{brand.name} - {vehicleModel.name}'
        
        dictionary['sale_value_formatted'] = self.sale_value_formatted
        dictionary['mileage_formatted'] = self.mileage_formatted
        dictionary['transmission_formatted'] = self.transmission_formatted
        dictionary['fuel_type_formatted'] = self.fuel_type_formatted
            
        return dictionary
    
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)