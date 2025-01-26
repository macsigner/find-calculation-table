import LookupTable from './LookupTable.js';
import { data } from '../data.js';
import Editor from './Editor.js';
import DeleteEntry from './DeleteEntry.js';
import AddEntry from './AddEntry.js';
import { updateDownloadButton } from '../tools.js';
import ResetToOriginalData from './ResetToOriginalData.js';

class App {
    constructor() {
        const el = document.querySelector('#app');
        this.el = el;

        new DeleteEntry();
        new AddEntry();
        new Editor();
        new ResetToOriginalData();

        this.render();

        document.addEventListener('submit', e => {
            e.preventDefault();
        });

        const reset = () => {
            updateDownloadButton();
            this.render();
        };

        document.addEventListener('editorUpdate', () => reset());
        document.addEventListener('resetToOriginalData', () => reset());
    }

    render() {
        this.el.innerHTML = '';

        const data = this.getData();

        for(let key in data) {
            const tableWrapper = document.createElement('div');

            this.el.appendChild(tableWrapper);

            new LookupTable(tableWrapper, data[key], key);
        }

        const tableWrapper = document.createElement('div');
        tableWrapper.classList.add('monster-table');

        this.el.appendChild(tableWrapper);

        const monster = {
            title: 'Monstertabelle',
            items: data.flatMap(item => {
                return item.items;
            }),
        };

        new LookupTable(tableWrapper, monster, data.length + 1);
    }

    /**
     *
     * @returns {null|Array}
     */
    getData() {
        return JSON.parse(localStorage.getItem('tables')) || data;
    }
}

export default App;
