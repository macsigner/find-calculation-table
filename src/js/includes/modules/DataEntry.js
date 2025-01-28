import { delegate } from '../tools.js';

class DataEntry extends HTMLElement {
    static formAssociated = true;

    #internals;
    #template;

    constructor() {
        super();

        this.#internals = this.attachInternals();
        this.#template = document.querySelector('#data-entry');

        this.addEventListener('click', delegate('[data-delete-entry]', e => {
            this.remove();
        }));
    }

    connectedCallback() {
        this.form = document.createElement('form');
        this.classList.add('data-entry')
        this.innerHTML = '';
        this.form.appendChild(this.#template.content.cloneNode(true));
        this.appendChild(this.form);
    }

    set value(obj) {
        for(let name of Object.keys(obj)) {
            const value = obj[name]
            this.querySelector(`[name="${name}"]`)
                .value = typeof value === 'object' ? value.join('\n') : value;
        }

        this.#internals.setFormValue(obj);
    }

    get value() {
        const form = this.querySelector('form');
        const formData = new FormData(form);

        const value = {};
        for(let entry of formData.entries()) {
            if (entry[0] === 'dependencies') {
                value[entry[0]] = entry[1].trim().split('\n').map(str => str.trim());
            } else {
                value[entry[0]] = entry[1];
            }
        }

        return value;
    }
}

customElements.define('data-entry', DataEntry)
