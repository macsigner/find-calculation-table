import {delegate} from '../tools.js';

class Modal {
    #modal;
    #modalInner;
    #parent;

    constructor(content, options = {
        parent: document.body,
        close: true,
    }) {
        this.#modal = document.createElement('aside');
        this.#modal.classList.add('modal');
        this.#modal.dataset.modal = '';
        this.#modalInner = document.createElement('div');
        this.#modalInner.classList.add('modal__inner');
        this.#modalInner.dataset.modalItem = 'inner';
        this.#modal.appendChild(this.#modalInner);
        this.#parent = options.parent;

        const close = document.createElement('button');
        close.classList.add('modal__close');
        close.dataset.modalItem = 'close';
        this.#modalInner.appendChild(close)
        this.#modalInner.appendChild(content);
        this.#parent.appendChild(this.#modal);

        const closeModal = delegate('[data-modal-item="close"]', e => {
            this.#modal.remove();
            document.removeEventListener('click', closeModal);
        });

        document.addEventListener('click', closeModal);
    }
}

export default Modal;
