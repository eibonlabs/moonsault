const helloWorld = require('./services/helloWorld');
const helloWorldWithParams = require('./services/helloWorldWithParams');
const getContent = require('./services/getContent');

/**
 * Initializes all services for the specified application.
 * Calls `start` on apps, components and pages services.
 *
 * @param {object} app - express js application instance
 */
const start = (app, appName) => {
    helloWorld.start(app, appName);
    helloWorldWithParams.start(app, appName);
    getContent.start(app, appName);
    console.log(`started services for ${appName}`);
};

module.exports = { start }