const componentName = 'p-error';

import { buildComponent } from '../../../../lib/moonsault.js';
import html from './html.js';
import css from './css.js';

// web component
class Error extends HTMLElement {
    // connect component
    connectedCallback() {
        buildComponent(componentName, html, css, this);
        console.info('Error Page Connected');
    }
}

// register component
customElements.define(componentName, Error);

export default Error;