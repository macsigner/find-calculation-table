import LookupTable from './LookupTable.js';
import { data } from '../data.js';
import { delegate } from '../tools.js';
import Editor from './Editor.js';
import DeleteEntry from './DeleteEntry.js';
import AddEntry from './AddEntry.js';

class App {
    constructor() {
        const el = document.querySelector('#app');
        new DeleteEntry();
        new AddEntry();

        const keys = [
            'cashflowAnalysis',
            'activity',
        ];

        for(let key of keys) {
            const tableWrapper = document.createElement('div');
            tableWrapper.dataset.table = key;

            el.appendChild(tableWrapper);

            new LookupTable(el, data[key]);
        }

        new Editor();

        document.addEventListener('submit', e => {
            e.preventDefault();
        })
    }
}

export default App;
