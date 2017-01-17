var config = {}

config.port = process.env.PORT || 80;
config.mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/ipgeolocator";
config.collection = process.env.COLLECTION || "ipgeolocator";
config.friendly = false;

module.exports = config;

