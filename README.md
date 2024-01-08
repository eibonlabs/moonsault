# MOONSAULT - v.1.0.0

A super lightweight framework for building applications with native web components and ES6 modules. Moonsault has a few goals:

1. Use native web technologies to create a framework for building applications. Nothing proprietary. Nothing special.
2. Allow individual applications within the framework to set up public APIs to allow for data sharing. Moonsault does not have restrictions on how data can be shared since any public method could be used to send data to another public method.
3. Pages and components are simple web components with their own public and private APIs.
4. ES6 modules can be leveraged to split up the codebase into easy to manage parts.
5. Build processes are supported, but not required in order to facilitate deployment to any environment.

# Table of Contents

- [Getting Started](#getting-started)
- [Application Architecture](#application-architecture)
  - [Assets](#application---assets)
  - [Components and Pages](#application---components-and-pages)
  - [app.js](#application---appjs)
  - [config.js](#application---configjs)
  - [index.html](#application---indexhtml)
  - [localization.js](#application---localizationjs)
  - [routes.js](#application---routesjs)
- [Deployment](#deployment)
- [Dependencies](#dependencies)

# Getting Started

You will need node.js installed in order to run the moonsault create command line app.  
Node.js allows you to run JavaScript code outside of the browser.  
You can download node.js [here](https://nodejs.org).

After installing node.js, you'll need to download moonsault to your computer.  
The download link is [here](https://codeload.github.com/eibonlabs/moonsault/zip/refs/heads/main).

Unzip the moonsault-main.zip file to a location on your computer.

After unzippng moonsault-main.zip, open a terminal (or command prompt), and navigate to the directory where you unzipped the archive.

Now you need to install the dependencies needed in order to build applications locally on your computer. In the terminal, run the following command:  
`npm install`

Next, you'll need to create an application. Creating applications is done through the moonsault create command line application. In the terminal, run the following command:  
`node create`.

You'll be presented with a list of options. Choose `1. Create an application.` by typing in `1` and presssing Enter.

Next, you'll be asked to name your application. For this example, we'll call the application TestApp. Type in `TestApp`, and press Enter.

You should see that the application was created, and also set as the default application.

Press Enter again, to go back to the main menu.

Choose `5. Quit` by typing in `5` and pressing Enter.

Next, you'll need start the server. In the terminal, run the following command:  
`npm run start`

You should see that the build completed, and that it is watching for changes.

Open the web browser of your choice and navigate to [http://localhost:8080](http://localhost:8080).

You should see that the application is up and running!

[⬆ Back to TOC](#table-of-contents)

# Application Architecture

The moonsault framework allows developers to host multiple applications under one framework. These applications are stored in the src/apps directory.

The default application (defined in the body tag of `src/index.html`) will get loaded when navigationg to [http://localhost:8080](http://localhost:8080), but you can also go directly to an application through the url using the following pattern `http://localhost:8080/apps/APP_NAME`.

Within each application is a common set of directories and initial files:

- assets
  - css
    - app.css
  - fonts
  - lib
- components
  - ComponentName
    - css.js
    - html.js
    - index.js
- pages
  - PageName
    - css.js
    - html.js
    - index.js
- app.js
- config.js
- favicon.png
- index.html
- localization.js
- routes.js

The moonsault API is available through the `moonsault` object. Type `moonsault` into your web developer tools to see the public portions of the API!

[⬆ Back to TOC](#table-of-contents)

## Application - assets

This directory contains assets that can be used by your application. Assets would include things like stylesheets that apply to the entire application (apps.css), fonts, images, and external libraries (like jQuery).

[⬆ Back to TOC](#table-of-contents)

## Application - components and pages

All components and pages within moonsault are native [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_Components). The components and pages in moonsault are separated into three files:

- css.js
- html.js
- index.js

The `css.js` and `html.js` files are used to style the component or page and to also set its initial template. These files are setup as standard [ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), and simply export template literals that will be used by the component defined in the `index.js` file.

Inside the index.js file of your component or page, you'll see where the web component name is defined (in the `componentName` variable), and also where some imports occur.

```
import { buildComponent } from '../../../../lib/moonsault.js';
import html from './html.js';
import css from './css.js';
```

The `buildComponent` method is imported from the moonsault framework, and is used set up the web component. The `buildComponent` method does the following:

1. Sets the name of the web component.
2. Sets the web components template to the value returned from html.js.
3. Adds a style tag to the head of the document that contains the value returned from css.js
4. Makes the web component available to the moonsault API. This allows you to call the web component's methods through JavaScript, and this facilitates operatons such as passing data from one component to another.

To import a component into a page, just use the `import` statement in a component or page's html.js file, and then use that tag in the template literal. For example, lets say I have an html.js file where I want to import a component called `c-helloWorld`. My html.js file could look like this:

```
import '../HelloWorld/index.js';

const html =`
<div class="example">
    <c-helloWorld></c-helloWorld>
</div>`;

export default html;
```

Components that are outside of the `#page` element will be added to the `moonsault.staticComponents` object.

Components and pages will be added to the `moonsault.pageComponents` object. Pages are usually prefixed with `p-`, while components are prefixed with `c-`. This is using the `componentName` defined in your page or component. Note that you can name it whatever you want, but this is the convention used by default in the framework.

Whenver a route is resolved, `moonsault.pageComponents` will be updated with the components for that page (and the page component itself).

Components and pages can have public APIs, and this will allow you to access methods on the components.

For example, the HelloWorld component has a `helloWorld` public method. To access it, you could run `moonsault.pageComponents["c-hello-world"].helloWorld()` in your web developer tools console, when on the `#/home` route. This would then display "You called the public API!".

[⬆ Back to TOC](#table-of-contents)

## Application - app.js

The entry point of the application is `app.js`. This module does a few things:

1. Imports the `setupApp` from the moonsault framework.
2. Imports the applications's `localization.js` module.
3. Imports the applications `routes.js` module.
4. Imports components that are used outside of the `#page` element.
5. Passes in a template that is used as theo overall layout of the application, and is appended to the `body` of the document. This template must include a `#page` element in order for routing to work correctly.

[⬆ Back to TOC](#table-of-contents)

## Application - config.js

`config.js` is a simple module that exports key/value pairs that can be used to configure your application. An example use case for this module would be placing all of your application endpoints here.

You can access the config through JavaScript with `moonsault.config`.

[⬆ Back to TOC](#table-of-contents)

## Application - index.html

This is the default file loaded by the server, and uses a data-app attribute in the body tag in order to instruct moonsault on which application should be loaded from the apps directory. Here is an example:

```
<body class="ExampleApplication" data-app="ExampleApplication">
```

Note that this same method of application loading is used in `src/index.html`.

You can also go directly to an application through the url using the following pattern `http://localhost:8080/apps/APP_NAME`.

[⬆ Back to TOC](#table-of-contents)

## Application - localization.js

The localization.js module exports keyvalue pairs that can be used by elements in your template that have the `data-localize` attribute. For example, lets say your localization.js module looks like this:

```
const localization = {
    en: {
        "hello": "Hello!",
    },
    sp: {
        "hello": "Hola!"
    },
    ja: {
        "hello": "おはようございます"
    }
};

export { localization };
```

[⬆ Back to TOC](#table-of-contents)

In your component, you could have `<span data-localize="hello"></span>`, and depending on what the `lang` attribute is set to in your index.html file, you could have a greeting in different languages. If your index.html file contains `<html lang="en">`, it will output Hello, `lang="sp"` would output the spanish version, and `lang="ja"` would output the japanese version.

[⬆ Back to TOC](#table-of-contents)

## Application - routes.js

The routes.js module sets up all of the routes available in your application. It uses imports to import the pages, and then sets up key/value pairs to map a hash in the URL to the web component that should be displayed for the page. Pages are populated in the `#page` element that is defined in `app.js`. Here is an example:

```
/* import pages here */
import './pages/Error/index.js';
import './pages/Home/index.js';
import './pages/About/index.js';

const routes = {
    '#/error': 'p-error',
    '/': 'p-home',
    '#/home': 'p-home',
    '#/about': 'p-about'
};

export { routes };
```

[⬆ Back to TOC](#table-of-contents)

# Deployment

Moonsault uses [esbuild](https://esbuild.github.io) to produce a distributable build of the framework that is placed in the `public` directory. This is produced any time a change is made to a file in the `src` directory.

The contents of the `public` directory can then be copied over to the server of your choice.

Althought builds are automatically generated, you can also just copy over the contents of the `src` directory to the server of your choice, as well. This provided flexibility for environments that may have not approved the use of esbuild.

[⬆ Back to TOC](#table-of-contents)

# Dependencies

Moonsault itself does not have dependencies, but the tooling that goes along with it, does. For example, in order to use the moonsault create command line application, you need to have [node.js](https://nodejs.org) installed, along with the [fs-extra](https://github.com/jprichardson/node-fs-extra) package.

Other dependecies that are included in this repo are:

- [esbuild](https://esbuild.github.io)
- [express](https://github.com/expressjs/express)
- [fs-extra](https://github.com/jprichardson/node-fs-extra)
- [jsdoc](https://github.com/jsdoc/jsdoc)
- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)

JSDoc and swagger are used for code documentation, and not a real dependency in the framework.

Express is used for setting up a local server for hosting the framework, and also provides and easy way for mocking up endpoints for your applications.

Fs-extra is used by the moonsault create command line app for copying files from the template into the target application.

It's completely possible to build moonsault applications without these dependencies, but they do make life a little easier :)

Moonsault has been scanned with [sonarqube](https://www.sonarsource.com/products/sonarqube/), and the only problems are the cognitive complexity score for the moonsault create command line application. This will be fixed in the future, though. The framework itself, along with the template app should pass the scan without any problems.

[⬆ Back to TOC](#table-of-contents)
