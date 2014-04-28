# Let's just use the local mongod instance. Edit as needed.
#
# # Please note that MONGO_HOST and MONGO_PORT could very well be left
# # out as they already default to a bare bones local 'mongod' instance.
MONGO_HOST = 'localhost'
MONGO_PORT = 27017
# MONGO_USERNAME = 'user'
# MONGO_PASSWORD = 'user'
MONGO_DBNAME = 'jv'

API_VERSION = 'v1'
URL_PREFIX = 'api'
DOMAIN = {
    'most_wanted': {},
    'most_rated': {},
    'genre_female_teachers': {},
    'genre_female_college_students': {},
    'genre_office_lady': {
        'schema': {
            'title': {
                'type': 'string'
            },
            'preview': {
                'type': 'string'
            },
            'downloadurl': {
                'type': 'string'
            },
            'actor': {
                'type': 'list'
            },
            'category': {
                'type': 'list'
            },
            'fav': {
                'type': 'boolean'
            }
        },
        'item_methods': ['GET', 'PATCH', 'DELETE']
    },
    'test': {
        'schema': {
            'firstname': {
                'type': 'string',
                'minlength': 1,
                'maxlength': 10,
            },
            'lastname': {
                'type': 'string',
                'minlength': 1,
                'maxlength': 15,
                'required': True,
                'unique': True,
            },
            # 'role' is a list, and can only contain values from 'allowed'.
            'role': {
                'type': 'list',
                'allowed': ["author", "contributor", "copy"],
            },
            # An embedded 'strongly-typed' dictionary.
            'location': {
                'type': 'dict',
                'schema': {
                    'address': {'type': 'string'},
                    'city': {'type': 'string'}
                },
            },
            'born': {
                'type': 'datetime',
            }
        },
        'resource_methods': ['GET', 'POST', 'DELETE'],
        'item_methods': ['GET', 'PATCH', 'DELETE', 'PUT']
    }
}

# ITEM_METHODS = ['GET', 'PATCH', 'DELETE']

X_DOMAINS = '*'

PAGINATION = False
PAGINATION_LIMIT = 50
PAGINATION_DEFAULT = 25

CACHE_CONTROL = 'max-age=1000,must-revalidate'
CACHE_EXPIRES = 1000


