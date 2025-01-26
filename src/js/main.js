import '../scss/main.scss'
import { data } from './includes/data.js';

import LookupTable from './includes/modules/LookupTable.js';

document.querySelectorAll('[data-table]').forEach(el => new LookupTable(el, data[el.dataset.table]));
