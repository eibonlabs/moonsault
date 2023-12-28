const componentName = 'c-hello-world';

import { buildComponent } from '../../../../lib/moonsault.js';
import html from './html.js';
import css from './css.js';

// web component
class HelloWorld extends HTMLElement {
    helloWorld() {
        console.log('You called the public API!');
    }

    // connect component
    connectedCallback() {
        buildComponent(componentName, html, css, this);
    }
}

// register component
customElements.define(componentName, HelloWorld);

export default HelloWorld;