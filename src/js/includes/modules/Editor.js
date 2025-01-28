import { delegate } from '../tools.js';
import AddEntry from './AddEntry.js';

class Editor {
    constructor() {
        this.editArea = document.querySelector('#edit-area');
        this._wrapperForm = document.querySelector('#form-table').content.cloneNode(true);
        this._entryForm = document.querySelector('#form-entry').content.cloneNode(true);
        this.editArea.innerHTML = '';
        this.inner = document.createElement('div');
        this.inner.classList.add('edit-area__inner');
        this.editArea.appendChild(this.inner);

        document.addEventListener('click', e => {
            if (this.editArea.matches('.is-active') && e.target.closest('.edit-area__inner') === this.inner) {
                return;
            }

            this.close();
        });

        document.addEventListener('click', delegate('[data-add-table]', () => {
            this.open();
        }));

        this.editArea.addEventListener('submit', e => {
            e.preventDefault();

            let isValid = true;
            for (let form of Array.from(e.target.querySelectorAll('form'))) {
                isValid = form.checkValidity();

                if (!isValid) {
                    form.reportValidity();

                    break;
                }
            }

            if (!isValid) {
                return;
            }

            this.addDataFromForm(e.target);
        })
    }

    open(data) {
        this.editArea.classList.add('is-active');

        this.inner.innerHTML = '';

        this.inner.appendChild(this._wrapperForm.cloneNode(true));

        if(data) {
            this.applyData(data);
        }
    }

    close() {
        this.editArea.classList.remove('is-active');
    }

    applyData(data) {
        const title = this.inner.querySelector('[name="title"]');
        title.value = data.title;

        const addEntryButton = this.inner.querySelector('[data-add-entry]');

        AddEntry.setEntry(addEntryButton, data);
    }

    addDataFromForm(form) {
        let localData = JSON.parse(localStorage.getItem('tables'));

        const data = this.getDataFromForm(form);
        localData.push(data);

        localStorage.setItem('tables', JSON.stringify(localData));

        this.editArea.dispatchEvent(new CustomEvent('editorUpdate', {
            bubbles: true,
            detail: {
                editor: this,
                data,
            }
        }));

        this.close();
    }

    /**
     *
     * @param {HTMLFormElement} form
     * @returns {{}}
     */
    getDataFromForm(form) {
        const formData = new FormData(form);
        const obj = {};

        for (let key of formData.keys()) {
            obj[key] = formData.get(key);
        }

        obj.items = Array.from(form.querySelectorAll('form.data-form')).map(subform => {
            const subformData = new FormData(subform);

            return {
                name: subformData.get('name'),
                dependencies: subformData.get('dependencies').trim().split('\n'),
                formula: subformData.get('formula'),
            };
        });

        return obj;
    }
}

export default Editor;
