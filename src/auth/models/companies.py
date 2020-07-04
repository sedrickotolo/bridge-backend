import mongoengine
import datetime


class Company(mongoengine.Document):
    registered_date = mongoengine.DateTimeField(default=datetime.datetime.now)
    first_name = mongoengine.StringField(required=True)
    last_name = mongoengine.StringField(required=True)
    work_email = mongoengine.StringField(required=True)
    organisation = mongoengine.StringField(required=True)
    description = mongoengine.StringField(required=True)
    product = mongoengine.StringField(required=True)

    meta = {
        'db_alias': 'core',
        'collection': 'companies'
    }
