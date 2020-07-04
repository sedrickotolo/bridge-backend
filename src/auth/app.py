from flask import Flask
from flask_restful import Api
from flask_jwt import JWT
from config.db_connection import MongoSetup
from controllers.security import authenticate, identity
from routes.join import Join
from routes.register import UserRegister

app = Flask(__name__)
app.secret_key = "secret"
api = Api(app)

jwt = JWT(app, authenticate, identity)  # creates auth endpoint

api.add_resource(Join, '/join')
api.add_resource(UserRegister, '/register')

if __name__ == '__main__':
    MongoSetup.global_init()
    app.run(port=5000, debug=True)
