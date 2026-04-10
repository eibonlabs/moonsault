/* import pages here */
import './pages/Error/index.js';
import './pages/Home/index.js';
import './pages/About/index.js';
import './pages/Examples/index.js';
import './pages/Desktop/index.js';

const routes = {
    '#/error': 'p-error',
    '/': 'p-home',
    '#/home': 'p-home',
    '#/about': 'p-about',
    '#/examples': 'p-examples',
    '#/desktop': 'p-desktop'
};

export { routes };