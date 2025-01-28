import { delegate } from '../tools.js';

class AddEntry {
    constructor() {
        document.addEventListener('click', delegate('[data-add-entry]', e => {
            e.target.parentNode.insertBefore(document.createElement('data-entry'), e.target);
        }));
    }
}

export default AddEntry;
