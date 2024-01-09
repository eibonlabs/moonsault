const componentName = 'c-markdown';

import { buildComponent } from '../../../../lib/moonsault.js';
import { marked } from './marked.esm.js';
import html from './html.js';
import css from './css.js';

// web component
class Markdown extends HTMLElement {
    async getMarkdownFile(src) {
        await fetch(src).then(response => {
            if (!response.ok) {
                throw new Error("Network response was not OK");
            } else {
                response.text().then(markdown => {
                    this.innerHTML = marked(markdown);
                });
            }
        });
    }

    // connect component
    connectedCallback() {
        buildComponent(componentName, html, css, this);
        console.info('Markdown Page Connected');
        const src = `${moonsault.currentAppPath}assets/content/${this.getAttribute('data-src')}`;
        this.getMarkdownFile(src);
    }
}

// register component
customElements.define(componentName, Markdown);

export default Markdown;