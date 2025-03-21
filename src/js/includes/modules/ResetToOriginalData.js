import { delegate } from '../tools.js';
import { data } from '../data.js';
import InfoModal from './InfoModal.js';

class ResetToOriginalData {
    #modal;
    constructor() {
        document.addEventListener('click', delegate('[data-reset-to-original-data-modal]', () => {
            if(this.#modal && this.#modal.parent) {
                return;
            }

            const content = document.createElement('div');
            content.innerHTML = `
                <p>Die aktuellen Daten werden gelöscht und auf den Ursprung zurückgesetzt!</p>
                <div>
                    <button class="button button--outline" type="button" data-reset-to-original-data>Daten auf 
                        Ursprung zurücksetzen</button>
                </div>
            `;

            this.#modal = new InfoModal({
                content,
                title: 'Achtung!'
            });
        }));

        document.addEventListener('click', delegate('[data-reset-to-original-data]', () => {
            localStorage.setItem('tables', JSON.stringify(data));
            document.dispatchEvent(new CustomEvent('resetToOriginalData'));
            this.#modal.close();
            this.#modal = null;
        }));
    }
}

export default ResetToOriginalData;
