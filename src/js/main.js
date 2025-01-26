import '../scss/main.scss'
import { data } from './includes/data.js';

import LookupTable from './includes/modules/LookupTable.js';
import App from './includes/modules/App.js';

new App();

document.querySelectorAll('[data-table]').forEach(el => new LookupTable(el, data[el.dataset.table]));
