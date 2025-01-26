import LookupTable from './LookupTable.js';
import { data } from '../data.js';

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
    }
}

export default App;
