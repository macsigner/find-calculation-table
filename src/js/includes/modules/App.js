import LookupTable from './LookupTable.js';
import Editor from './Editor.js';
import {delegate, shortNames, updateDownloadButton} from '../tools.js';
import ResetToOriginalData from './ResetToOriginalData.js';
import DeleteTable from './DeleteTable.js';
import {storage} from './Storage.js';

class App {
    #currentTab;

    constructor(el = document.querySelector('#app')) {
        this.el = el;
        this.tabs = document.createElement('div');
        this.tabs.classList.add('tabs');
        this.el.appendChild(this.tabs);

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
            let l = shortNames.getAll();
            l.sort((a, b) => a.name.localeCompare(b.name))
        };

        document.addEventListener('editorUpdate', () => reset());
        document.addEventListener('resetToOriginalData', () => reset());
        document.addEventListener('deleteTable', () => reset());

        document.addEventListener('click', delegate('[data-edit-table]', e => {
            const id = Number(e.target.closest('[data-edit-table]').dataset.editTable);

            this.editor.open(this.getData(), id);
        }));

        this.el.addEventListener('click', delegate('.tabs__title', e => {
            const header = e.target.closest('.tabs__title');
            this.el.querySelectorAll('.tabs__title').forEach(el => el.classList.toggle('active', el === header));
            this.#currentTab = Number(header.dataset.tabId);
        }));
    }

    render() {
        this.tabs.innerHTML = '';

        const data = this.getData();
        const dep = [];

        for (let key in data) {
            const wrapper = this.renderSingleTable(data[key], {key: Number(key)});

            if (key !== '0' || typeof this.#currentTab === 'number') {
                continue;
            }

            wrapper.querySelector('.tabs__title').classList.add('active');
        }

        if (this.#currentTab) {
            const tab = this.el.querySelector(`[data-tab-id="${this.#currentTab}"]`) || this.el.querySelector('[data-tab-id]');
            tab?.classList.add('active');
        }

        const tableWrapper = document.createElement('div');
        tableWrapper.classList.add('monster-table');

        this.renderSingleTable({
            title: 'Monstertabelle',
            items: data.flatMap(item => {
                return item.items;
            }),
        }, {
            el: tableWrapper,
        });
    }

    renderSingleTable(data, options) {
        const tableWrapper = options.el || document.createElement('div');
        tableWrapper.classList.add('tabs__item-wrapper');

        this.tabs.appendChild(tableWrapper);

        if (typeof options.key !== 'undefined') {
            new LookupTable(tableWrapper, data, options.key);
        } else {
            new LookupTable(tableWrapper, data);
        }

        return tableWrapper;
    }

    /**
     *
     * @returns {null|Array}
     */
    getData() {
        return storage.get('tables');
    }
}

export default App;
