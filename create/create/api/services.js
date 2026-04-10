/**
 * @module Create-services
 */

const apps = require('./services/apps');
const components = require('./services/components');
const pages = require('./services/pages');

/**
 * Initializes all services for the specified application.
 * Calls `start` on apps, components and pages services.
 *
 * @param {object} app - express js application instance
 */
const start = (app) => {
    apps.start(app);
    components.start(app);
    pages.start(app);

    console.log(`started services for moonsault create`);
};

module.exports = { start }