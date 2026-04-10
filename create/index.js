(function () {
    const fsExtra = require('fs-extra'),
        fs = require('fs'),
        path = require('path'),
        srcDirectory = '/src/',
        appsDirectory = `${srcDirectory}apps/`,
        templateDirectory = '/create/Template/';

    /**
     * Clears the terminal screen and resumes stdin.
     */
    const clear = () => {
        process.stdout.write('\x1Bc');
        process.stdin.resume();
    }

    /**
     * Displays the logo, a thank‑you message, and exits the process.
     */
    const quit = () => {
        displayLogo();
        console.log('Thanks for using moonsault!');
        console.log();
        process.exit();
    }

    /**
     * Returns the string with its first character capitalised.
     * @param {string} string - The input string.
     * @returns {string}
     */
    const capitalizeFirstLetter = (string) => {
        if (string) {
            return string[0].toUpperCase() + string.slice(1);
        } else {
            return string;
        }
    }

    /**
     * Writes a file to the specified destination.
     * Ensures the target directory exists and writes the supplied data.
     * If an error occurs during creation or writing, logs the error and exits.
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

    /**
     * Copies page template files to the destination and replaces placeholders.
     * Reads each asset file (index.js, html.js, css.js) from the source template,
     * performs string replacements for component name and title, then writes
     * the result to the destination directory.
     *
     * @param {string} src - Path to the template page folder.
     * @param {string} dest - Destination directory for the new page.
     * @param {string} name - Page name used for placeholder substitution.
     */
    const processPageFiles = (src, dest, name) => {
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
                    writeFile(dest, asset, data);
                }
            });
        }
    }

    /**
     * Updates the application's route configuration to include a new page.
     * Reads the existing routes file, injects an import statement for the
     * newly created page component and adds a route mapping.
     *
     * @param {string} src - Path to the existing routes.js file.
     * @param {string} dest - Destination path for writing the updated file (same as src).
     * @param {string} name - Name of the page to add.
     * @param {string} appName - Application name used when constructing paths.
     */
    const addRoute = (src, dest, name, appName) => {
        console.log('UPDATING ROUTE')
        fsExtra.readFile(`${src}`, function (err, data) {
            if (err) {
                console.log('ERROR WITH READING ROUTE FILE');
                throw err
            } else {
                data = data.toString();
                const importInjectionPoint = data.lastIndexOf('.js');
                const importString = `import './pages/${name}/index`;

                // add import
                data = data.slice(0, importInjectionPoint) + `.js';\n${importString}` + data.slice(importInjectionPoint);

                // add route
                const routeInjectionPoint = data.lastIndexOf("'");
                const routeString = `'#/${name.toLowerCase()}': 'p-${name.toLowerCase()}`;
                data = data.slice(0, routeInjectionPoint + 1) + `,\n    ${routeString}` + data.slice(routeInjectionPoint);

                writeFile(`${path.resolve()}${appsDirectory}${appName}/`, `routes.js`, data);
            }
        });
    };


    /**
     * Orchestrates the creation of a new page within an application.
     * Prompts the user for a page name, copies template files,
     * updates routing, and provides console feedback.
     *
     * @param {string} appName - Name of the application where the page will be created.
     */
    const createPage = (appName) => {
        displayLogo();
        console.log(`Please enter the name of the page you would like to create in the ${appName} application, or press ENTER to cancel: `);
        process.stdin.once('data', (name) => {
            name = name.toString().trim();
            const src = `${path.resolve()}${templateDirectory}pages/_TEMPLATE_/`;
            const dest = `${path.resolve()}${appsDirectory}${appName}/pages/${capitalizeFirstLetter(name)}/`;
            if (name !== '') {
                if (!fs.existsSync(dest)) {

                    processPageFiles(src, dest, name);
                    addRoute(`${path.resolve()}${appsDirectory}${appName}/routes.js`, `${path.resolve()}${appsDirectory}${appName}/routes.js`, name, appName);

                    console.log('');
                    console.log(`Page ${name} created!`);
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

    /**
         * Copies component template files to the destination and replaces placeholders.
         * Reads each asset file (index.js, html.js, css.js) from the source template,
         * performs string replacements for component name and title, then writes
         * the result to the destination directory.
         *
         * @param {string} src - Path to the template component folder.
         * @param {string} dest - Destination directory for the new component.
         * @param {string} name - Component name used for placeholder substitution.
         */
    const processComponentFiles = (src, dest, name) => {
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
                    data = data.replaceAll('c-_TEMPLATE_', `c-${name.toLowerCase()}`);
                    data = data.replaceAll('_TEMPLATE_', capitalizeFirstLetter(name));
                    writeFile(dest, asset, data);
                }
            });
        }
    }

    /**
     * Creates a new component within the specified application.
     * Prompts the user for a component name, copies template files,
     * and provides console feedback.
     *
     * @param {string} appName - Name of the application where the component will be created.
     */
    const createComponent = (appName) => {
        displayLogo();
        console.log(`Please enter the name of the component you would like to create in the ${appName} application, or press ENTER to cancel: `);
        process.stdin.once('data', (name) => {
            name = name.toString().trim();
            const src = `${path.resolve()}${templateDirectory}components/_TEMPLATE_/`;
            const dest = `${path.resolve()}${appsDirectory}${appName}/components/${capitalizeFirstLetter(name)}/`;
            if (name !== '') {
                if (!fs.existsSync(dest)) {
                    processComponentFiles(src, dest, name);

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
                writeFile(dest, '', data);
            }
        });
    }

    /**
     * Updates the application's stylesheet by replacing placeholder text.
     * Reads the app's CSS file and substitutes the template name with the
     * actual application name.
     *
     * @param {string} name - Name of the application to update.
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
     * Processes application files after copying.
     * Performs index and stylesheet updates, logs creation message,
     * and prompts the user to set the application as default.
     *
     * @param {string} src - Source directory of the app template (unused).
     * @param {string} dest - Destination directory where the app was copied.
     * @param {string} name - Name of the application.
     */
    const processAppFiles = (src, dest, name) => {
        renameApplicationIndex(name);
        remameApplicationStyleSheet(name);
        console.log('');
        console.log(`${name} application created!`);
        console.log('');
        console.log(`Would you like to set ${name} as the default application? [y/n]`);
        process.stdin.once('data', (selection) => {
            selection = selection.toString().trim();

            if (selection.toLowerCase() === 'y' || selection.toLowerCase() === 'yes') {
                defaultApp(name);
            } else {
                displayMainMenu();
            }

        });
    }

    /**
     * Copies an application template to the target directory.
     * After copying, triggers processing of app files and handles errors.
     *
     * @param {string} src - Path to the source template directory.
     * @param {string} dest - Destination path where the app should be copied.
     * @param {string} name - Name of the application being created.
     */
    const copyAppFiles = (src, dest, name) => {
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
                processAppFiles(src, dest, name);
            }
        });
    };

    /**
     * Initiates the creation of a new application.
     * Prompts the user for an application name, copies the template
     * files to a new directory, and handles duplicate or cancel cases.
     *
     * @returns {void}
     */
    const createApp = () => {
        displayLogo();
        console.log(`Please enter the name of the application you would like to create, or press ENTER to cancel: `);
        process.stdin.once('data', (name) => {
            name = name.toString().trim();
            const src = `${path.resolve()}${templateDirectory}`;
            const dest = `${path.resolve()}${appsDirectory}${name}`;
            if (name !== '') {
                if (!fs.existsSync(dest)) {
                    copyAppFiles(src, dest, name);
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

    /**
     * Waits for the user to press Enter and then returns to the main menu.
     * Used after actions that require a pause before showing options again.
     */
    const waitAndGoToMainMenu = () => {
        process.stdin.once('data', () => {
            displayMainMenu();
        });
    }

    /**
     * Sets the specified application as the default for the project.
     * Updates the root index.html file to reference the chosen app and
     * adjusts body class attributes accordingly.
     *
     * @param {string} appName - Name of the application to set as default.
     */
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
                        waitAndGoToMainMenu();
                    }
                });

            }
        });
    }

    /**
     * Handles user selection from a list of applications.
     * Validates the input, invokes the provided callback with the chosen
     * application name if the selection is valid, otherwise falls back to
     * prompting again or returning to the main menu.
     *
     * @param {number|string} selection - User's numeric or string input.
     * @param {string[]} apps - Array of available application names.
     * @param {function} callback - Function to call with the selected app name.
     * @param {string} prompt - Optional custom prompt message.
     */
    const processSelection = (selection, apps, callback, prompt) => {
        console.log(selection);
        console.log(apps);
        console.log(isNaN(selection))
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
    };

    /**
     * Prompts the user to select an application from the list of available apps.
     * Displays a numbered menu, captures input, and forwards the chosen
     * application name to the provided callback. If no valid selection is made,
     * it either re‑prompts or returns to the main menu.
     *
     * @param {function} callback - Function invoked with the selected app name.
     * @param {string} prompt - Optional custom message shown above the list.
     */
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
            processSelection(selection, apps, callback, prompt);

        });
    }

    /**
     * Clears the terminal and prints the application logo.
     * This function is called at the start of most user interactions
     * to provide a consistent visual header.
     */
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

    /**
     * Displays the main menu of the create tool.
     * Shows options such as creating an application, setting a default,
     * adding components or pages, and quitting. The menu is
     * rendered after clearing the screen and printing the logo.
     */
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