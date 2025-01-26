import { delegate } from '../tools.js';

class Editor {
    constructor() {
        this.editArea = document.querySelector('#edit-area');
        this._wrapperForm = document.querySelector('#form-table').content.cloneNode(true);
        this._entryForm = document.querySelector('#form-entry').content.cloneNode(true);
        this.editArea.innerHTML = '';
        this.inner = document.createElement('div');
        this.inner.classList.add('edit-area__inner');
        this.editArea.appendChild(this.inner);

        document.addEventListener('click', delegate('[data-add-table]', () => {
            this.open();

            this.inner.innerHTML = '';

            this.inner.appendChild(this._wrapperForm.cloneNode(true));
        }));

        document.addEventListener('click', e => {
            if(e.closest('#edit-area') === this.editArea) {
                return;
            }

            this.close();
        })
    }

    open() {
        this.editArea.classList.add('is-active');
    }

    close() {
        this.editArea.classList.add('is-active');
    }
}

export default Editor;
