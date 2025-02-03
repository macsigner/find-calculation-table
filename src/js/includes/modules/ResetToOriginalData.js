import { delegate } from '../tools.js';
import { data } from '../data.js';
import InfoModal from './InfoModal.js';

class ResetToOriginalData {
    constructor() {
        document.addEventListener('click', delegate('[data-reset-to-original-data]', () => {
            const content = document.createElement('div');
            new InfoModal({
                content,
                title: 'Hellow World!'
            });

//            localStorage.setItem('tables', JSON.stringify(data));
//            document.dispatchEvent(new CustomEvent('resetToOriginalData'));
        }));
    }
}

export default ResetToOriginalData;
