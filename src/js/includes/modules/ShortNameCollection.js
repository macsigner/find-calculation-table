import { shortNames } from '../shortNames.js';

class ShortNameCollection {
    #list;

    /**
     *
     * @param {Array} arr
     */
    constructor(arr = shortNames) {
        this.#list = arr;

        this.#list = this.#list.map(entry => {
            return {
                name: entry.name.trim(),
                shortName: entry.shortName.trim(),
            };
        });
    }

    get(name) {
        return this.#list.find(item => item.name === name) || null;
    }

    getSwitchMarkup(name, suffix = '', suffixShort = '') {
        const obj = this.get(name);

        if (!obj) {
            return name;
        }

        return `<span class="name-switch"><span class="name-switch__initial">${name}${suffix}</span><span class="name-switch__alt">${obj.shortName}${suffixShort}</span></span>`
    }

    add(name, shortName = '') {
        if(this.#list.find(item => item.name === name)) {
            return;
        }

        this.#list.push({
            name,
            shortName,
        });
    }

    getAll() {
        return this.#list;
    }
}

export default ShortNameCollection;
