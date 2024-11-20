const setPage = (page, route) => {
    const pageElement = document.querySelector('#page');
    moonsault.pageComponents = {};

    // initial page load
    if (pageElement.getAttribute('data-current-route') !== route) {
        if (pageElement.getAttribute('data-transition') === 'in' && pageElement.getAttribute('data-current-route') !== null) {
            // set the previous route
            moonsault.previousRoute = pageElement.getAttribute('data-current-route');

            // set transition out
            pageElement.setAttribute('data-transition', 'out');
        } else {
            // first view of site
            pageElement.innerHTML = `<${page}></${page}>`;
            pageElement.setAttribute('data-transition', 'in');
            pageElement.setAttribute('data-current-route', route);
        }

        // transition out animation has ended.
        pageElement.onanimationend = () => {
            if (pageElement.getAttribute('data-transition') !== 'in') {
                window.scrollTo(0, 0);
                document.querySelector('#page').scrollTo(0, 0);
                pageElement.innerHTML = `<${page}></${page}>`;
                pageElement.setAttribute('data-transition', 'in');
                pageElement.setAttribute('data-current-route', route);
            }
        }
        // page is already loaded
    } else {

    }

};

const buildURL = (route) => {
    const currentURL = `${window.location.origin}${window.location.pathname}${route}`;

    let paramsArray = [];

    for (const param in moonsault.currentRouteParams) {
        paramsArray.push({
            param: param,
            value: moonsault.currentRouteParams[param]
        });
    }

    let params = '';

    if (paramsArray.length > 0) {
        params = '?';
    }

    for (let i = 0; i < paramsArray.length; i += 1) {
        if (i === 0) {
            params += `${paramsArray[i].param}=${paramsArray[i].value}`;
        } else {
            params += `&${paramsArray[i].param}=${paramsArray[i].value}`;
        }
    }

    window.location.href = `${currentURL}${params}`;
}

const setURLParam = (param, value) => {
    moonsault.currentRouteParams[param] = value;
};

const deleteURLParam = (param, value) => {
    if (param !== undefined) {
        delete moonsault.currentRouteParams[param];
    } else {
        for (const param in moonsault.currentRouteParams) {
            delete moonsault.currentRouteParams[param];
        }
    }

};

const getRouteFromURL = () => {
    const url = new URL(window.location.href);

    if (url.hash.indexOf('#/') > -1) {
        return url.hash.split('?')[0];
    } else {
        return '';
    }
};

const resolveRoute = () => {
    // set the current route
    moonsault.currentRoute = getRouteFromURL();

    let page = moonsault.routes[getRouteFromURL()];

    if (getRouteFromURL() !== '') {
        if (!page) {
            page = moonsault.routes['#/error'];
        }
        setPage(page, getRouteFromURL());
    }
};

const startRouter = () => {
    window.onhashchange = () => {
        resolveRoute();
    };

    if (getRouteFromURL() !== '') {
        resolveRoute();
    } else {
        window.location.hash = document.querySelector('#page').getAttribute('data-defaultPage');
    }
}

export { startRouter, getRouteFromURL, buildURL, setURLParam, deleteURLParam };