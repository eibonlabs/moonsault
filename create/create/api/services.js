const apps = require('./services/apps');

const start = (app) => {
    apps.start(app);
    console.log(`started services for moonsault create`);
};

module.exports = { start }