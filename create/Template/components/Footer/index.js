const componentName = 'c-footer';

import { buildComponent } from '../../../../lib/moonsault.js';
import html from './html.js';
import css from './css.js';

// web component
class Footer extends HTMLElement {
    // connect component
    connectedCallback() {
        buildComponent(componentName, html, css, this);
    }
}

// register component
customElements.define(componentName, Footer);

export default Footer;