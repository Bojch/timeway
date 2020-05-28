const client = {
    PORT: 7000,
    HOST: 'localhost',
};
const server = {
    PORT: 3000,
    HOST: 'localhost',
};
const SERVER_URI = `http://${server.HOST}:${server.PORT}`;

const URL_TIMERECORDS = `${SERVER_URI}/timerecords`;
const URL_PROJECTS = `${SERVER_URI}/projects`;

const settings = {
    hourly_rate: 26,
    currency: '&euro;',
};

module.exports = {
    URL_TIMERECORDS: URL_TIMERECORDS,
    URL_PROJECTS: URL_PROJECTS,

    settings: settings,

    PORT: client.PORT,
    HOST: client.HOST,
    time_format: 'HH:mm',
};
