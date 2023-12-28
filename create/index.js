(function () {
    const fsExtra = require('fs-extra'),
        fs = require('fs'),
        path = require('path'),
        srcDirectory = '/src/',
        appsDirectory = `${srcDirectory}apps/`,
        templateDirectory = '/create/Template/';

    const clear = () => {
        process.stdout.write('\x1Bc');
        process.stdin.resume();
    }

    const quit = () => {
        displayLogo();
        console.log('Thanks for using moonsault!');
        console.log();
        process.exit();
    }

    const capitalizeFirstLetter = (string) => {
        if (string) {
            return string[0].toUpperCase() + string.slice(1);
        } else {
            return string;
        }
    }

    const createPage = (appName) => {
        displayLogo();
        console.log(`Please enter the name of the page you would like to create in the ${appName} application, or press ENTER to cancel: `);
        process.stdin.once('data', (name) => {
            name = name.toString().trim();
            const src = `${path.resolve()}${templateDirectory}pages/_TEMPLATE_/`;
            const dest = `${path.resolve()}${appsDirectory}${appName}/pages/${capitalizeFirstLetter(name)}/`;
            if (name !== '') {
                if (!fs.existsSync(dest)) {
                    const assets = [
                        'index.js',
                        'html.js',
                        'css.js'
                    ];

                    for (let asset of assets) {
                        fsExtra.readFile(`${src}${asset}`, function (err, data) {
                            if (err) {
                                throw err
                            } else {
                                data = data.toString();
                                // replace component name
                                data = data.replaceAll('p-_TEMPLATE_', `p-${name.toLowerCase()}`);
                                data = data.replaceAll('_TEMPLATE_', capitalizeFirstLetter(name));
                                fsExtra.mkdir(dest, function (err) {
                                    fsExtra.writeFile(`${dest}${asset}`, data, function (err) {
                                        if (err) {
                                            console.log('An error occurred when writing');
                                            console.log(err);
                                            quit();
                                        }
                                    });
                                });
                            }
                        });
                    }

                    console.log('');
                    console.log(`Page ${name} created!`);
                    console.log('');
                    console.log(`Don't forget to add the page to your application's routes.js file!`);
                    console.log('');
                    console.log('Press enter to continue.');

                    process.stdin.once('data', () => {
                        displayMainMenu();
                    });
                } else {
                    console.log('');
                    console.log(`The ${name} page already exists!`);
                    console.log('');
                    console.log('Press enter to continue.');
                    process.stdin.once('data', () => {
                        displayMainMenu();
                    });
                }
            } else {
                displayMainMenu();
            }
        });
    }

    const createComponent = (appName) => {
        displayLogo();
        console.log(`Please enter the name of the component you would like to create in the ${appName} application, or press ENTER to cancel: `);
        process.stdin.once('data', (name) => {
            name = name.toString().trim();
            const src = `${path.resolve()}${templateDirectory}components/_TEMPLATE_/`;
            const dest = `${path.resolve()}${appsDirectory}${appName}/components/${capitalizeFirstLetter(name)}/`;
            if (name !== '') {
                if (!fs.existsSync(dest)) {
                    const assets = [
                        'index.js',
                        'html.js',
                        'css.js'
                    ];

                    for (let asset of assets) {
                        fsExtra.readFile(`${src}${asset}`, function (err, data) {
                            if (err) {
                                throw err
                            } else {
                                data = data.toString();
                                // replace component name
                                data = data.replaceAll('c-_TEMPLATE_', `p-${name.toLowerCase()}`);
                                data = data.replaceAll('_TEMPLATE_', capitalizeFirstLetter(name));
                                fsExtra.mkdir(dest, function (err) {
                                    fsExtra.writeFile(`${dest}${asset}`, data, function (err) {
                                        if (err) {
                                            console.log('An error occurred when writing');
                                            console.log(err);
                                            quit();
                                        }
                                    });
                                });
                            }
                        });
                    }

                    console.log('');
                    console.log(`Component ${name} created!`);
                    console.log('');
                    console.log('Press enter to continue.');


                    process.stdin.once('data', () => {
                        displayMainMenu();
                    });
                } else {
                    console.log('');
                    console.log(`The ${name} component already exists!`);
                    console.log('');
                    console.log('Press enter to continue.');
                    process.stdin.once('data', () => {
                        displayMainMenu();
                    });
                }
            } else {
                displayMainMenu();
            }
        });
    }

    const renameApplicationIndex = (name) => {
        const dest = `${path.resolve()}${appsDirectory}${name}/index.html`;
        fsExtra.readFile(`${dest}`, function (err, data) {
            if (err) {
                throw err
            } else {
                data = data.toString();
                data = data.replaceAll('TemplateApplication', name);
                fsExtra.mkdir(dest, function (err) {
                    fsExtra.writeFile(`${dest}`, data, function (err) {
                        if (err) {
                            console.log('An error occurred when writing');
                            console.log(err);
                            quit();
                        }
                    });
                });
            }
        });
    }

    const remameApplicationStyleSheet = (name) => {
        const dest = `${path.resolve()}${appsDirectory}${name}/assets/css/app.css`;
        fsExtra.readFile(`${dest}`, function (err, data) {
            if (err) {
                throw err
            } else {
                data = data.toString();
                data = data.replaceAll('_TEMPLATE_', name);
                fsExtra.mkdir(dest, function (err) {
                    fsExtra.writeFile(`${dest}`, data, function (err) {
                        if (err) {
                            console.log('An error occurred when writing');
                            console.log(err);
                            quit();
                        }
                    });
                });
            }
        });
    }

    const createApp = () => {
        displayLogo();
        console.log(`Please enter the name of the application you would like to create, or press ENTER to cancel: `);
        process.stdin.once('data', (name) => {
            name = name.toString().trim();
            const src = `${path.resolve()}${templateDirectory}`;
            const dest = `${path.resolve()}${appsDirectory}${name}`;
            if (name !== '') {
                if (!fs.existsSync(dest)) {
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
                            renameApplicationIndex(name);
                            remameApplicationStyleSheet(name);

                            let apps = [];

                            fsExtra.readdirSync(`${path.resolve()}${appsDirectory}`).filter((file) => {
                                if (fsExtra.statSync(path.join(`${path.resolve()}${appsDirectory}`, file)).isDirectory()) {
                                    apps.push(file);
                                }
                            });

                            console.log('');
                            if (apps.length === 1) {
                                console.log(`${name} application created!`);
                                defaultApp(name);
                            } else {
                                console.log(`${name} application created!`);
                                console.log('');
                                console.log('Remember to set this as the default app to load, if you want!');
                                console.log('');
                                console.log('Press enter to continue.');
                                process.stdin.once('data', () => {
                                    displayMainMenu();
                                });
                            }
                        }
                    });
                } else {
                    console.log('');
                    console.log(`The ${name} application already exists!`);
                    console.log('');
                    console.log('Press enter to continue.');
                    process.stdin.once('data', () => {
                        displayMainMenu();
                    });
                }

            } else {
                displayMainMenu();
            }
        });
    }

    const defaultApp = (appName) => {
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
                        console.log(err);
                        quit();
                    } else {
                        console.log('');
                        console.log(`${appName} is now the default application!`);
                        console.log('');
                        console.log('Press enter to continue.');
                        process.stdin.once('data', () => {
                            displayMainMenu();
                        });
                    }
                });

            }
        });
    }

    const selectApp = (callback, prompt) => {
        displayLogo();
        if (prompt === '' || prompt === undefined) {
            console.log('Please select an application, or press ENTER to cancel: ');
        } else {
            console.log(prompt);
        }

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

        process.stdin.once('data', (selection) => {
            selection = parseInt(selection.toString().trim(), 10);

            if (isNaN(selection) === false) {
                if (selection > 0 && selection <= apps.length) {
                    if (typeof callback === 'function') {
                        callback(apps[selection - 1]);
                    }
                } else {
                    selectApp(callback, prompt);
                }

            } else {
                displayMainMenu();
            }
        });
    }

    const displayLogo = () => {
        clear();
        console.log(`
+================================================================================+
| ███╗   ███╗ ██████╗  ██████╗ ███╗   ██╗███████╗ █████╗ ██╗   ██╗██╗  ████████╗ |
| ████╗ ████║██╔═══██╗██╔═══██╗████╗  ██║██╔════╝██╔══██╗██║   ██║██║  ╚══██╔══╝ |
| ██╔████╔██║██║   ██║██║   ██║██╔██╗ ██║███████╗███████║██║   ██║██║     ██║    |
| ██║╚██╔╝██║██║   ██║██║   ██║██║╚██╗██║╚════██║██╔══██║██║   ██║██║     ██║    |
| ██║ ╚═╝ ██║╚██████╔╝╚██████╔╝██║ ╚████║███████║██║  ██║╚██████╔╝███████╗██║    |
| ╚═╝     ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝    | 
+==================================== CREATE ====================================+
`);
    }

    const displayMainMenu = () => {
        displayLogo();
        const menu = {
            'label': 'Please choose what you would like to do:',
            'selection': [
                'Create an application.',
                'Select the default application.',
                'Create a new component.',
                'Create a new page.',
                'Quit'
            ]
        };

        console.log(`${menu.label} \n`);
        for (let i = 0; i < menu.selection.length; i += 1) {
            console.log(`${i + 1}. ${menu.selection[i]} `);
        }
        process.stdin.once('data', (selection) => {
            selection = parseInt(selection.toString().trim(), 10);
            switch (selection) {
                case 1:
                    createApp();
                    break;
                case 2:
                    selectApp(defaultApp, "Please select the application that you would like to be the default for moonsault, or press ENTER to cancel: ");
                    break;
                case 3:
                    selectApp(createComponent, "");
                    break;
                case 4:
                    selectApp(createPage, "");
                    break;
                case 5:
                    quit();
                    break;
                default:
                    displayMainMenu();
                    break;
            }
        });
    }

    displayMainMenu();
}());