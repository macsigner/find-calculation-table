import { delegate } from '../tools.js';

class AddEntry {
    constructor() {
        this.entryTag = document.querySelector('#form-entry').content.cloneNode(true);

        console.log(this.entryTag);

        document.addEventListener('click', delegate('[data-add-entry]', e => {
            e.target.parentNode.insertBefore(this.entryTag.cloneNode(true), e.target);
        }));
    }
}

export default AddEntry;
