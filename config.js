var config = {}

config.port = process.env.PORT || 8080;
config.mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/logger";
config.collection = process.env.COLLECTION || "logs" ;

module.exports = config;

