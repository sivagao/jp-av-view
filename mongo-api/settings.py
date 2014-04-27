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
    'genre_female_college_students': {}
}

X_DOMAINS = '*'

PAGINATION = True
PAGINATION_LIMIT = 50
PAGINATION_DEFAULT = 25

CACHE_CONTROL = 'max-age=1000,must-revalidate'
CACHE_EXPIRES = 1000