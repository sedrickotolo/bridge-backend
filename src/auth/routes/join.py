from flask_restful import Resource, reqparse
import controllers.data_services as data_services


class Join(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('first_name',
                        type=str,
                        required=True,
                        help="This field cannot be blank"
                        )

    parser.add_argument('last_name',
                        type=str,
                        required=True,
                        help="This field cannot be blank"
                        )

    parser.add_argument('work_email',
                        type=str,
                        required=True,
                        help="This field cannot be blank"
                        )

    parser.add_argument('organisation',
                        type=str,
                        required=True,
                        help="This field cannot be blank"
                        )

    parser.add_argument('description',
                        type=str,
                        required=True,
                        help="This field cannot be blank"
                        )

    parser.add_argument('product',
                        type=str,
                        required=True,
                        help="This field cannot be blank"
                        )

    def post(self):
        data = Join.parser.parse_args()

        if data_services.find_company_by_name(data['work_email'], data['organisation']):
            return {"message": "Account with organisation name already exists"}, 400

        company = data_services.join_bridge(data['first_name'], data['last_name'], data['work_email'],
                                            data['organisation'],
                                            data['description'],
                                            data['product'])
        return {"first_name": company.first_name, "last_name": company.last_name, "work_email": company.work_email,
                "organisation": company.organisation, "description": company.description,
                "product": company.product}, 201
