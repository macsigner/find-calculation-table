import { delegate } from '../tools.js';

class AddEntry {
    constructor() {
        document.addEventListener('click', delegate('[data-add-entry]', e => {
            AddEntry.addEntry(e.target);
        }));
    }

    static setEntry(el, data) {
        console.log(this.entryTag);
    }

    static addEntry(target) {
        target.target.parentNode.insertBefore(AddEntry.getEntryForm().cloneNode(true), target);
    }

    static getEntryForm() {
        return document.querySelector('#form-entry').content.cloneNode(true);
    }
}

export default AddEntry;
