import { delegate } from '../tools.js';

class DeleteEntry {
    constructor() {
        document.addEventListener('click', delegate('[data-delete-entry]', e => {
            e.target.closest('form')?.remove();
        }));
    }
}

export default DeleteEntry;
