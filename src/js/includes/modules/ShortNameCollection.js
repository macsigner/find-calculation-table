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

    getSwitchMarkup(name) {
        const obj = this.get(name);

        if (!obj) {
            return name;
        }

        if(!obj.shortName) {
            console.log(name);
        }

        return `<span class="name-switch"><span class="name-switch__initial">${name}</span><span class="name-switch__alt">${obj.shortName}</span></span>`
    }

    add(name) {
        if(this.#list.find(item => item.name === name)) {
            return;
        }

        this.#list.push({
            name,
            shortName: '',
        });

        console.log(name);
    }
}

export default ShortNameCollection;
