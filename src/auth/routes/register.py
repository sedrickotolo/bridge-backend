from flask_restful import Resource, reqparse
import controllers.data_services as data_services


class UserRegister(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username',
                        type=str,
                        required=True,
                        help="This field can not be left blank.")

    parser.add_argument('password',
                        type=str,
                        required=True,
                        help="This field can not be left blank.")

    def post(self):
        data = UserRegister.parser.parse_args()

        if data_services.find_user_by_name(data['username']):
            return {"message": "A user with that username already exists"}, 400

        user = data_services.create_user_account(data['username'], data['password'])
        return {"message": "Account with username {} created successfully.".format(user.username)}, 201
