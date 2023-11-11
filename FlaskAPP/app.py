import os
from datetime import timedelta
from flask import Flask
from database import db
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required
from flask_babel import Babel
from config import Config, TestingConfig
from sqlalchemy.sql import func

basedir = os.path.abspath(os.path.dirname(__file__))

def create_app(testing=False):
    app = Flask(__name__)

    if testing:
        app.config.from_object(TestingConfig)
    else:
        app.config.from_object(Config)

    db.init_app(app)
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    migrate = Migrate(app, db)
    CORS(app, origins=["http://localhost:3000"])
    
    app.config['JWT_SECRET_KEY']           = '7U9YvsCoVSMcjHj'  
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=6) 
    
    jwt = JWTManager(app)
    
    babel = Babel(app)
    
    from routes.login_blueprint import login_bp
    app.register_blueprint(login_bp)
    
    from routes.brand_blueprint import brand_bp
    app.register_blueprint(brand_bp)
    
    from routes.VehicleModel_blueprint import model_bp
    app.register_blueprint(model_bp)
    
    from routes.Vehicle_blueprint import vehicle_bp
    app.register_blueprint(vehicle_bp)

    return app

app = create_app()

if __name__ == '__main__':
    app.run(port=8000, debug=True)