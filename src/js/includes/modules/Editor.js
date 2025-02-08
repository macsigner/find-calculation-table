import { delegate } from '../tools.js';
import {storage} from './Storage.js';

class Editor {
    constructor() {
        this.editArea = document.querySelector('#edit-area');
        this._wrapperForm = document.querySelector('#form-table').content.cloneNode(true);
        this.editArea.innerHTML = '';
        this.inner = document.createElement('div');
        this.inner.classList.add('edit-area__inner');
        this.editArea.appendChild(this.inner);

        const closeItem = document.createElement('button');
        closeItem.classList.add('edit-area__close');
        closeItem.innerHTML = '<i class="icon icon--cross"></i>';
        closeItem.dataset.toggleEditArea = '';

        this.editArea.appendChild(closeItem);

        document.addEventListener('click', delegate('[data-add-entry]', e => {
            e.target.parentNode.insertBefore(document.createElement('data-entry'), e.target);
        }));

        document.addEventListener('click', delegate('[data-toggle-edit-area]', e => {
            this.close();
        }));

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

    open(data, index) {
        this.editArea.classList.add('is-active');

        this.inner.innerHTML = '';

        this.inner.appendChild(this._wrapperForm.cloneNode(true));

        if (data && typeof index === 'number' && !isNaN(index)) {
            this.applyData(data, index);
        }
    }

    close() {
        this.editArea.classList.remove('is-active');
    }

    applyData(arr, index) {
        const data = arr[index];

        this.inner.querySelector('[name="title"]').value = data.title;
        this.inner.querySelector('[name="index"]').value = typeof index !== 'undefined' ? index : '';

        const addEntryButton = this.inner.querySelector('[data-add-entry]');

        for (let item of data.items) {
            const entry = document.createElement('data-entry');

            addEntryButton.parentNode.insertBefore(entry, addEntryButton);
            entry.value = item;
        }
    }

    addDataFromForm(form) {
        let localData = storage.get('tables');

        const data = this.getDataFromForm(form);

        if (data.index !== '') {
            localData[data.index] = data;
        } else {
            localData.push(data);
        }

        storage.set('tables', localData);

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

        obj.items = Array.from(form.querySelectorAll('data-entry')).map(entry => entry.value);

        return obj;
    }
}

export default Editor;
