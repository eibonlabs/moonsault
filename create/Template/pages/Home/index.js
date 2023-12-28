const componentName = 'p-home';

import { buildComponent } from '../../../../lib/moonsault.js';
import html from './html.js';
import css from './css.js';

// web component
class Home extends HTMLElement {
    // connect component
    connectedCallback() {
        buildComponent(componentName, html, css, this);
        console.info('Home Page Connected');
    }
}

// register component
customElements.define(componentName, Home);

export default Home;