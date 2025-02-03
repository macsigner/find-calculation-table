import Modal from './Modal.js';

class InfoModal extends Modal {
    constructor(options) {
        const content = document.createElement('div');
        content.classList.add('info-modal');
        content.innerHTML = `
            <h2>${options.title}<button class="info-modal__close icon icon--cross" data-modal-item="close"></button></h2>
        `;

        const infoModalContent = document.createElement('div');
        infoModalContent.classList.add('info-modal__content');
        infoModalContent.appendChild(options.content);
        content.appendChild(options.content);

        const modal = super(content);

        console.log(modal);
    }
}

export default InfoModal;
