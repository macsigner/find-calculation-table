import {delegate} from '../tools.js';
import {data} from '../data.js';

class DeleteTable {
    constructor() {
        document.addEventListener('click', delegate('[data-delete-table]', e => {
            const index = Number(e.target.closest('[data-delete-table]').dataset.deleteTable);

            let localData;

            if (!localStorage.getItem('tables')) {
                localData = data;
            } else {
                localData = JSON.parse(localStorage.getItem('tables'));
            }

            localData.splice(index, 1);

            localStorage.setItem('tables', JSON.stringify(localData));

            e.target.dispatchEvent(new CustomEvent('deleteTable', {
                bubbles: true,
            }));
        }));
    }
}

export default DeleteTable;
