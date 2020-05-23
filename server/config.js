const PORT = 3000;
const HOST = 'localhost';

const mongodb = {
    PORT: 27017,
    DB: 'tieway',
    HOST: HOST,
};

module.exports = {
    PORT: PORT,
    MONGO_URI: `mongodb://${mongodb.HOST}:${mongodb.PORT}/${mongodb.DB}`,
};
