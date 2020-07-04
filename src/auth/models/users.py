import mongoengine


class User(mongoengine.Document):
    id = mongoengine.StringField(required=True, primary_key=True)
    username = mongoengine.StringField(required=True)
    password = mongoengine.StringField(required=True)

    meta = {
        'db_alias': 'core',
        'collection': 'users'
    }
