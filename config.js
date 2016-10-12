var config = {}

config.port = process.env.PORT || 80;
config.mongoUrl = process.env.MONGO_URL || null;
config.collection = process.env.COLLECTION || null;

module.exports = config;

