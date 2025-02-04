import { delegate } from '../tools.js';

class Modal {
    #modal;
    #modalInner;
    #parent;

    constructor(content, options = {
        close: true,
    }) {
        this.#modal = document.createElement('aside');
        this.#modal.classList.add('modal');
        this.#modal.dataset.modal = '';
        this.#modalInner = document.createElement('div');
        this.#modalInner.classList.add('modal__inner');
        this.#modalInner.dataset.modalItem = 'inner';
        this.#modal.appendChild(this.#modalInner);
        this.#parent = options.parent || document.body;

        if (options.close) {
            const close = document.createElement('button');
            close.classList.add('modal__close', 'icon', 'icon--cross');
            close.dataset.modalItem = 'close';
            this.#modalInner.appendChild(close)
        }

        this.#modalInner.appendChild(content);
        this.#parent.appendChild(this.#modal);

        const closeModal = delegate('[data-modal-item="close"]', e => {
            if(e.target.closest('[data-modal]') !== this.#modal) {
                return;
            }

            this.close();
            document.removeEventListener('click', closeModal);
        });

        document.addEventListener('click', closeModal);
    }

    close() {
            this.#modal.remove();
    }

    get parent() {
        return this.#modal.parentNode;
    }
}

export default Modal;
