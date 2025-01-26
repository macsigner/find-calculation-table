import LookupTable from './LookupTable.js';
import { data } from '../data.js';
import Editor from './Editor.js';
import DeleteEntry from './DeleteEntry.js';
import AddEntry from './AddEntry.js';
import { updateDownloadButton } from '../tools.js';

class App {
    constructor() {
        const el = document.querySelector('#app');
        this.el = el;

        new DeleteEntry();
        new AddEntry();
        new Editor();

        this.render();

        document.addEventListener('submit', e => {
            e.preventDefault();
        });

        document.addEventListener('editorUpdate', e => {
            updateDownloadButton();
            this.render();
        });
    }

    render() {
        this.el.innerHTML = '';

        for(let entry of this.getData()) {
            const tableWrapper = document.createElement('div');

            this.el.appendChild(tableWrapper);

            new LookupTable(tableWrapper, entry);
        }
    }

    getData() {
        return JSON.parse(localStorage.getItem('tables')) || data;
    }
}

export default App;
