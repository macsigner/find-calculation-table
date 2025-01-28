import LookupTable from './LookupTable.js';
import { data } from '../data.js';
import Editor from './Editor.js';
import { delegate, updateDownloadButton } from '../tools.js';
import ResetToOriginalData from './ResetToOriginalData.js';
import DeleteTable from './DeleteTable.js';

class App {
    constructor(el = document.querySelector('#app')) {
        this.el = el;

        new ResetToOriginalData();
        new DeleteTable();
        this.editor = new Editor();

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
        document.addEventListener('deleteTable', () => reset());

        document.addEventListener('click', delegate('[data-edit-table]', e => {
            const id = Number(e.target.closest('[data-edit-table]').dataset.editTable);

            this.editor.open(this.getData(), id);
        }));
    }

    render() {
        this.el.innerHTML = '';

        const data = this.getData();

        for (let key in data) {
            const tableWrapper = document.createElement('div');

            this.el.appendChild(tableWrapper);

            new LookupTable(tableWrapper, data[key], Number(key));
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

        new LookupTable(tableWrapper, monster);
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
