import {data} from '../data.js';

class Storage {
    #data;

    constructor() {
        this.load();
    }

    /**
     * Save current state of storage to local storage.
     */
    save() {
        localStorage.setItem('data', JSON.stringify(this.#data));
    }

    /**
     * Load current data set from storage or default data.
     */
    load() {
        this.#data = JSON.parse(localStorage.getItem('data')) || {
            tables: data,
        };
    }

    /**
     * Get given key for current data set.
     * @param {String} key
     * @returns {Object|Array|null}
     */
    get(key) {
        return this.#data[key];
    }

    /**
     * Set given key to specified data.
     * @param {String} key
     * @param {*} data
     * @returns {*}
     */
    set(key, data) {
        this.#data[key] = data;

        this.save();

        return this.#data[key];
    }

    /**
     * Delete specified entry from given data structure key.
     * @param key
     * @param entry
     */
    delete(key, entry) {
        if (Array.isArray(this.#data[key])) {
            this.#data[key].splice(entry, 1);
        } else {
            delete this.#data[key][entry];
        }

        this.save();
    }

    /**
     * Reset to original data set.
     */
    reset() {
        this.#data = {
            tables: data,
        };

        this.save();
    }
}

export const storage = new Storage();
