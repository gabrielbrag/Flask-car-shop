from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import Brand, VehicleModel
from database import db

model_bp = Blueprint('model', __name__)

@model_bp.before_request
@jwt_required()
def require_jwt():
    pass

@model_bp.route('/models', methods=['GET'])
def get_models():
    brand_id = request.args.get('brand_id')
    
    if brand_id is None:
        models = VehicleModel.query.all()
    else:
        models = VehicleModel.query.filter_by(brand_id=brand_id).all()

    model_list = [model.to_dict() for model in models]
    
    if not models and brand_id is not None:
        return jsonify(f"No models found for brand id {brand_id}"), 404
    
    return jsonify(model_list)

@model_bp.route('/models/<int:id>', methods=['GET'])
def get_model(id):
    model = db.session.get(VehicleModel, id)
    if (model is None):
        return jsonify(f"Model not found: id {id}"), 404
    else:
        return jsonify(model.to_dict())

@model_bp.route('/models', methods=['POST'])
def create_model():
    name = request.json['name']
    brand_id = request.json['brand_id']
    
    brand = db.session.get(Brand, brand_id)
    
    if brand is None:
        returnData = {'message': 'Invalid brand_id'}
        return returnData, 400
    
    new_model = VehicleModel(name=name, brand_id=brand_id)
    db.session.add(new_model)
    db.session.commit()
    return jsonify(new_model.to_dict())

@model_bp.route('/models/<int:id>', methods=['PUT'])
def update_model(id):
    model = db.session.get(VehicleModel, id)
    name = request.json['name']
    brand_id = request.json['brand_id']

    brand = db.session.get(Brand, brand_id)
    
    if brand is None:
        returnData = {'message': 'Invalid brand_id'}
        return returnData, 400    
    
    model.name = name
    print(name)
    model.brand_id = brand_id
    db.session.commit()
    return jsonify(model.to_dict())

@model_bp.route('/models/<int:id>', methods=['DELETE'])
def delete_model(id):
    model = db.session.get(VehicleModel, id)
    db.session.delete(model)
    db.session.commit()
    return jsonify(f"Model deleted: id {model.id}")
