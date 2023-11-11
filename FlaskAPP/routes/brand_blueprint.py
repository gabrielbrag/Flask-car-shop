from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import Brand
from database import db

brand_bp = Blueprint('brand', __name__)

@brand_bp.before_request
@jwt_required()
def require_jwt():
    pass

@brand_bp.route('/brands', methods=['GET'])
def get_brands():
    brands = db.session.query(Brand)
    brand_list = [brand.to_dict() for brand in brands]
    return jsonify(brand_list)

@brand_bp.route('/brands/<int:id>', methods=['GET'])
def get_brand(id):
    brand = db.session.get(Brand, id)
    return jsonify(brand.to_dict())

@brand_bp.route('/brands', methods=['POST'])
def create_brand():
    name = request.json['name']
    new_brand = Brand(name=name)
    db.session.add(new_brand)
    db.session.commit()
    return jsonify(new_brand.to_dict())

@brand_bp.route('/brands/<int:id>', methods=['PUT'])
def update_brand(id):
    brand = db.session.get(Brand, id)
    name = request.json['name']
    brand.name = name
    db.session.commit()
    return jsonify(brand.to_dict())

@brand_bp.route('/brands/<int:id>', methods=['DELETE'])
def delete_brand(id):
    brand = db.session.get(Brand, id)
    db.session.delete(brand)
    db.session.commit()
    return jsonify(f"Brand deleted: id {brand.id}")
