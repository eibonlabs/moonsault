const componentName = 'c-markdown';

import { buildComponent } from '../../../../lib/moonsault.js';
import { marked } from './marked.esm.js';
import html from './html.js';
import css from './css.js';

// web component
customElements.define(componentName, class extends HTMLElement {

    loaded = false;

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
        if (this.loaded === false) {
            this.loaded = true;
            buildComponent(componentName, html, css, this);
            console.info('Markdown Page Connected');
            const src = `${moonsault.currentAppPath}assets/content/${this.getAttribute('data-src')}`;
            this.getMarkdownFile(src);
        }
    }
});