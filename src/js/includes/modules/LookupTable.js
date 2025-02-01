import {delegate, updateDownloadButton} from '../tools.js';
import {data} from '../data.js';

updateDownloadButton();

class LookupTable {
    constructor(el, data, id) {
        const items = data.items;
        const title = data.title;
        const dependencies = Array.from(new Set(items.flatMap(d => d.dependencies))).sort();

        const header = dependencies.map((dRow, dKey) => `<th data-col="${dKey}">${dRow}</th>`).join('');
        const rows = this.#generateRows(dependencies, items).join('');
        const headerButtons = this.#generaHeaderButtons(id, title);
        const shortList = this.#generateShortList(dependencies, items);

        let table = `
            <h1 class="tabs__title">${title}</h1>
            <div class="tabs__item">
                ${headerButtons ? headerButtons : ''}
                <table class="dependency-table" style="--cols: ${dependencies.length + 1}">
                    <tr><th></th>${header}</tr>
                    ${rows}
                </table>
                <dl class="dependency-list">${shortList}</dl>
            </div>`;

        el.innerHTML = table;

        el.addEventListener('click', delegate('[data-row]', e => {
            const i = e.target.closest('[data-row]').dataset.row;

            el.querySelectorAll('.active-row').forEach(el => el.classList.remove('active-row'));
            el.querySelectorAll(`[data-row="${i}"]`).forEach(el => el.classList.add('active-row'));
        }))

        el.addEventListener('click', delegate('[data-col]', e => {
            const i = e.target.closest('[data-col]').dataset.col;

            el.querySelectorAll('.active-col').forEach(el => el.classList.remove('active-col'));
            el.querySelectorAll(`[data-col="${i}"]`).forEach(el => el.classList.add('active-col'));
        }))
    }

    #generateRows(dependencies, items) {
        let cells =  dependencies.map((dRow, keyRow) => {
            const tds = dependencies.map((dCol, keyCol) => {
                const possibleResults = items.filter(item => {
                    return dRow !== dCol && item.dependencies.includes(dRow) && item.dependencies.includes(dCol);
                }).map(item => {
                    let unmetDependency = item.dependencies.filter(dep => {
                        return dep !== dCol && dep !== dRow;
                    });

                    unmetDependency = unmetDependency.length ? `<sup>*</sup> <em class="unmet">(${unmetDependency.join(', ')})</em>` : '';

                    return {
                        result: item.name.trim(),
                        unmetDependency,
                        formula: item.formula
                    };
                });

                return {
                    id: keyCol,
                    results: possibleResults,
                }
            });

            return {
                tds,
            }
        });

        cells =  cells.map((row, rowId) => {
            console.log(row, rowId)
            const cells = dependencies.map((dCol, keyCol) => {
                const possibleResults = items.filter(item => {
                    return dRow !== dCol && item.dependencies.includes(dRow) && item.dependencies.includes(dCol);
                }).map(item => {
                    let unmetDependency = item.dependencies.filter(dep => {
                        return dep !== dCol && dep !== dRow;
                    });

                    unmetDependency = unmetDependency.length ? `<sup>*</sup> <em class="unmet">(${unmetDependency.join(', ')})</em>` : '';

                    return {
                        result: item.name.trim(),
                        unmetDependency,
                        formula: item.formula
                    };
                });

                return {
                    id: keyCol,
                    results: possibleResults,
                }

                return `<td data-col="${keyCol}" data-row="${keyRow}">${possibleResults}</td>`;
            }).join('');

            return `<tr><th data-row="${keyRow}">${dRow}</th>${cells}</tr>`;
        });

        return cells;
    }

    #generaHeaderButtons(id, title) {
        return typeof id === 'number' ? `
            <div class="table-options">
                <button class="button" data-delete-table="${id}" title="${title} löschen">Löschen</button>
                <button class="button" data-edit-table="${id}" title="${title} editieren">Editieren</button>
            </div>` : '';
    }

    #generateShortList(dependencies, items) {
        return dependencies.map(dependency => {
            const dependants = items.filter(item => item.dependencies.includes(dependency) && item.name !== dependency);

            const dependantsHtml = dependants.map(dep => {
                return `
                    <span class="dependency-list__sub-description">${dep.dependencies.filter(dep => dep !== dependency).join(', ')}</span>
                    <span class="dependency-list__sub-description">${dep.name}</span>
                    <span class="dependency-list__sub-description">${dep.formula} = ${dep.name}</span>`;
            }).join('')

            return `
                    <dt class="dependency-list__title" style="--dep-length: ${dependants.length}">${dependency}</dt>
                    <dd class="dependency-list__description">${dependantsHtml}</dd>
            `;
        }).join('');
    }
}

export default LookupTable;
