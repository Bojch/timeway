const client = {
    PORT: 7000,
    HOST: 'localhost',
};
const server = {
    PORT: 3000,
    HOST: 'localhost',
};

module.exports = {
    PORT: client.PORT,
    HOST: client.HOST,
    SERVER_URI: `http://${server.HOST}:${server.PORT}`,
};
