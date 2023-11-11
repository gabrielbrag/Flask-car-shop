import base64
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import Vehicle, VehicleModel
from database import db
from models import Vehicle

#create blueprint
vehicle_bp = Blueprint('vehicle_bp', __name__)

@vehicle_bp.route('/vehicles', methods=['GET'])
def get_vehicles():
    vehicles = db.session.query(Vehicle).order_by(Vehicle.sale_value).all() #.order_by(desc(Vehicle)).all()
    
    vehicles_list = [vehicle.to_dict() for vehicle in vehicles]
    return jsonify(vehicles_list), 200   

@vehicle_bp.route('/vehicles/<int:id>', methods=['GET'])
def get_vehicle(id):
    vehicle = db.session.get(Vehicle, id)
    return jsonify(vehicle.to_dict()), 200

@vehicle_bp.route('/vehicles', methods=['POST'])
@jwt_required()
def create_vehicle():
    data = request.get_json()
        
    photo = data.get('photo')
    
    if photo is not None:
        photo = base64.b64decode(photo)
    
    if "photo" in data:
        data.pop('photo')
        
    vehicle = Vehicle()

    for key, value in data.items():
        setattr(vehicle, key, value)
    
    if photo is not None:
        setattr(vehicle, 'photo', photo)

    db.session.add(vehicle)
    db.session.commit()
    
    return jsonify(vehicle.to_dict()), 201

@vehicle_bp.route('/vehicles/<int:id>', methods=['PUT'])
@jwt_required()
def update_vehicle(id):
    data = request.get_json()
    
    photo = data.get('photo')
    
    if photo is not None:
        photo = base64.b64decode(photo)
    
    if "photo" in data:
        data.pop('photo')
     
    vehicle = db.session.get(Vehicle, id)
       
    for key, value in data.items():
        setattr(vehicle, key, value)
    
    if photo is not None:
        setattr(vehicle, 'photo', photo)
    
    db.session.commit()
    
    return jsonify(vehicle.to_dict()), 200

@vehicle_bp.route('/vehicles/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_vehicle(id):
    vehicle = db.session.get(Vehicle, id)
    db.session.delete(vehicle)
    db.session.commit()
    return '', 200

#get vehicle photo
@vehicle_bp.route('/vehicles/<int:id>/photo', methods=['GET'])
def get_vehicle_photo(id):
    vehicle = db.session.get(Vehicle, id)
    if vehicle is None:
        return '', 404
    elif vehicle.photo is None:
        return '', 404
        
    return vehicle.photo_link()
