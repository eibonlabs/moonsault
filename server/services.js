const helloWorld = require('./services/helloWorld');
const helloWorldWithParams = require('./services/helloWorldWithParams');
const getFiles = require('./services/getFiles');

const start = (app) => {
    helloWorld.start(app);
    helloWorldWithParams.start(app);
    getFiles.start(app);
};

module.exports = { start }