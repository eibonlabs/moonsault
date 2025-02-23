const fsExtra = require('fs-extra'),
    fs = require('fs'),
    path = require('path'),
    srcDirectory = '/src/',
    appsDirectory = `${srcDirectory}apps/`,
    templateDirectory = '/create/Template/';

const start = (app) => {
    console.log('attempting to apps service')
    // end point
    // this is a super basic end point. when the client makes a request to this
    // url, the server will response
    // this example just returns a model that the client will convert to JSON,
    // but you could put ANY server side code here!
    app.get(`/create/api/apps`, (request, response) => {
        const src = `${path.resolve()}${appsDirectory}`;

        let apps = [];

        fsExtra.readdirSync(src).filter((file) => {
            if (fsExtra.statSync(path.join(src, file)).isDirectory()) {
                apps.push(file);
            }
        });

        for (let i = 0; i < apps.length; i += 1) {
            console.log(`${i + 1}. ${apps[i]} `);
        }

        response.send(apps);
    });
};

module.exports = { start };