import LookupTable from './LookupTable.js';
import { data } from '../data.js';
import { delegate } from '../tools.js';
import Editor from './Editor.js';

class App {
    constructor() {
        const el = document.querySelector('#app');

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
    }
}

export default App;
