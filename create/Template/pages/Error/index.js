const componentName = 'p-error';

import { buildComponent } from '../../../../lib/moonsault.js';
import html from './html.js';
import css from './css.js';

// web component
customElements.define(componentName, class extends HTMLElement {
    constructor() {
        super();

        buildComponent(componentName, html, css, this);
    }

    // connect component
    connectedCallback() {
        console.info('Error Page Connected');
    }
});