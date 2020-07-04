import mongoengine


class MongoSetup:
    @staticmethod
    def global_init():
        mongoengine.register_connection(alias='core', name='auth')
