import LookupTable from './LookupTable.js';
import { data } from '../data.js';
import { delegate } from '../tools.js';
import Editor from './Editor.js';
import DeleteEntry from './DeleteEntry.js';
import AddEntry from './AddEntry.js';

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
    }

    render() {
        this.el.innerHTML = '';

        for(let entry of data) {
            const tableWrapper = document.createElement('div');

            this.el.appendChild(tableWrapper);

            new LookupTable(tableWrapper, entry);
        }
    }
}

export default App;
