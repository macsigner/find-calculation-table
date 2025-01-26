import { delegate } from '../tools.js';
import { data } from '../data.js';

class ResetToOriginalData {
    constructor() {
        document.addEventListener('click', delegate('[data-reset-to-original-data]', () => {
            localStorage.setItem('tables', JSON.stringify(data));
            document.dispatchEvent(new CustomEvent('resetToOriginalData'));
        }));
    }
}

export default ResetToOriginalData;
