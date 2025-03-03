import {delegate} from '../tools.js';
import {storage} from './Storage.js';

class DeleteTable {
    constructor() {
        document.addEventListener('click', delegate('[data-delete-table]', e => {
            const index = Number(e.target.closest('[data-delete-table]').dataset.deleteTable);

            storage.delete('tables', index);

            e.target.dispatchEvent(new CustomEvent('deleteTable', {
                bubbles: true,
            }));
        }));
    }
}

export default DeleteTable;
