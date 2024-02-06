const componentName = 'p-home';

import { buildComponent } from '../../../../lib/moonsault.js';
import html from './html.js';
import css from './css.js';

// web component
customElements.define(componentName, class extends HTMLElement {

    loaded = false;

    // connect component
    connectedCallback() {
        if (this.loaded === false) {
            this.loaded = true;
            buildComponent(componentName, html, css, this);
            console.info('Home Page Connected');
        }
    }
});