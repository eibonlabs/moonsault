const componentName = 'c-_TEMPLATE_';

import { buildComponent } from '../../../../lib/moonsault.js';
import html from './html.js';
import css from './css.js';

// web component
class _TEMPLATE_ extends HTMLElement {
    // connect component
    connectedCallback() {
        buildComponent(componentName, html, css, this);
        console.info('_TEMPLATE_ Page Connected');
    }
}

// register component
customElements.define(componentName, _TEMPLATE_);

export default _TEMPLATE_;