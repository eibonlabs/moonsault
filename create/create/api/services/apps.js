/**
 * @module Create-services-apps
 */

const fsExtra = require('fs-extra'),
    fs = require('fs'),
    path = require('path'),
    srcDirectory = '/src/',
    appsDirectory = `${srcDirectory}apps/`,
    templateDirectory = '/create/Template/';

/**
 * Ensures the destination directory exists and writes data to a file.
 * Logs an error and exits if writing fails.
 *
 * @param {string} dest - Destination directory path.
 * @param {string} asset - File name to write (e.g., 'index.js').
 * @param {string|Buffer} data - File contents.
 */
const writeFile = (dest, asset, data) => {
    fsExtra.mkdir(dest, function () {
        fsExtra.writeFile(`${dest}${asset}`, data, function (err) {
            if (err) {
                console.log('An error occurred when writing');
                console.log(err);
                quit();
            }
        });
    });
}

let appIsCopying = false;

/**
 * Updates the application's index.html by replacing placeholder text.
 * Writes the modified file back to disk.
 *
 * @param {string} name - Name of the application.
 */
const renameApplicationIndex = (name) => {
    const dest = `${path.resolve()}${appsDirectory}${name}/index.html`;
    fsExtra.readFile(`${dest}`, function (err, data) {
        if (err) {
            throw err
        } else {
            data = data.toString();
            data = data.replaceAll('TemplateApplication', name);
            writeFile(dest, '', data);
        }
    });
}

/**
 * Updates the application's stylesheet by replacing placeholder text.
 * Writes the modified file back to disk.
 *
 * @param {string} name - Name of the application.
 */
const remameApplicationStyleSheet = (name) => {
    const dest = `${path.resolve()}${appsDirectory}${name}/assets/css/app.css`;
    fsExtra.readFile(`${dest}`, function (err, data) {
        if (err) {
            throw err
        } else {
            data = data.toString();
            data = data.replaceAll('_TEMPLATE_', name);
            writeFile(dest, '', data);
        }
    });
}

/**
 * Handles copying and updating of application files after a new app is created.
 * Renames the index and stylesheet, then sends a success response.
 *
 * @param {string} src - Source template directory.
 * @param {string} dest - Destination application directory.
 * @param {string} name - Name of the new application.
 * @param {object} response - Express response object to send JSON.
 */
const processAppFiles = (src, dest, name, response) => {
    renameApplicationIndex(name);
    remameApplicationStyleSheet(name);

    const appSrc = `${path.resolve()}${appsDirectory}`;

    let apps = [];

    /**
     * Retrieves a list of application directories from the specified source path.
     *
     * @param {string} appSrc - The absolute or relative path to the applications source directory.
     * @returns {Array<string>} An array of directory names representing each application found within {@link appSrc}.
     */
    fsExtra.readdirSync(appSrc).filter((file) => {
        if (fsExtra.statSync(path.join(appSrc, file)).isDirectory()) {
            apps.push(file);
        }
    })

    console.log('Created Apps:');
    console.log(apps);
    if (apps.length === 1) {
        defaultApp(name, null);
    }

    const model = {
        message: `${name} application created!`,
        data: name,
        status: 200
    };

    response.send(model);

    appIsCopying = false;
}

/**
 * Copies the application template to the destination directory.
 * After copying, calls `processAppFiles` to finalize setup.
 *
 * @param {string} src - Source template directory.
 * @param {string} dest - Destination application directory.
 * @param {string} name - Name of the new application.
 * @param {object} response - Express response object to send JSON.
 */
const copyAppFiles = (src, dest, name, response) => {

    fsExtra.copy(src, dest, {
        filter: function (file) {
            if (file.indexOf('.DS') === -1) {
                return file;
            }
        }
    }, function (err) {
        if (err) {
            console.log('An error occurred when copying');
            console.log(err);
            quit();
        } else {
            processAppFiles(src, dest, name, response);
        }
    });
};

/**
 * Sets the specified application as the default.
 * Updates the root index.html file and returns a status message.
 *
 * @param {string} appName - Name of the application to set as default.
 * @param {object|null} response - Express response object; if provided, JSON is sent.
 */
const defaultApp = (appName, response) => {
    const src = `${path.resolve()}${srcDirectory}index.html`;
    fsExtra.readFile(src, function (err, data) {
        if (err) {
            throw err
        } else {
            data = data.toString();

            data = data.replace(/data-app="[^"]+"/g, `data-app="${appName}"`);
            data = data.replace(/class="[^"]+"/g, `class="${appName}"`);

            // if no app is defined, go ahead and define it and set the class name
            data = data.replace(/<body>/g, `<body class="${appName}" data-app="${appName}">`);

            fsExtra.writeFile(src, data, function (err) {
                if (err) {
                    console.log('An error occurred when writing');
                    const model = {
                        message: `An error occurred when writing`,
                        status: 400
                    };

                    if (response !== null) {
                        response.send(model);
                    } else {
                        console.log(model);
                    }

                } else {
                    console.log(`${appName} is now the default application!`);
                    const model = {
                        message: `${appName} is now the default application!`,
                        status: 200
                    };

                    if (response !== null) {
                        response.send(model);
                    } else {
                        console.log(model);
                    }
                }
            });
        }
    });
}


/**
 * Starts the app service by registering all required routes on the Express
 * application instance.
 *
 * @param {object} app - The Express application object.
 */
const start = (app) => {
    console.log('attempting to start apps service')
    // get all apps and return array
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

    app.param('appName', function (request, response, next, value) {
        request.appName = value;
        next();
    });

    app.get(`/create/api/apps/copying/`, (request, response) => {
        response.send(appIsCopying);
    });

    // create a new app
    app.post(`/create/api/apps`, (request, response) => {
        appIsCopying = true;
        console.log(request.body.name);

        const name = request.body.name.toString().trim().replaceAll(' ', '');

        const src = `${path.resolve()}${templateDirectory}`;
        const dest = `${path.resolve()}${appsDirectory}${name}`;
        if (name !== '') {
            if (!fs.existsSync(dest)) {
                copyAppFiles(src, dest, name, response);
            } else {
                const model = {
                    message: `The ${name} application already exists.`,
                    status: 400
                }
                response.send(model);
            }
        }
    });

    // set default
    app.param('appName', function (request, response, next, value) {
        request.appName = value;
        next();
    });

    app.put(`/create/api/:appName/setDefault`, (request, response) => {
        defaultApp(request.appName, response);
    });
};

module.exports = { start };
