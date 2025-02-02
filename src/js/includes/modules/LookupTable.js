import { delegate, shortNames, updateDownloadButton } from '../tools.js';

updateDownloadButton();

class LookupTable {
    constructor(el, data, id) {
        const items = data.items;
        const title = data.title;
        const dependencies = Array.from(new Set(items.flatMap(d => d.dependencies))).sort();

        const header = dependencies.map((dRow, dKey) => `<th data-col="${dKey}">${shortNames.getSwitchMarkup(dRow)}</th>`).join('');
        const rows = this.#generateRows(dependencies, items).join('');
        const headerButtons = this.#generaHeaderButtons(id, title);
        const shortList = this.#generateShortList(dependencies, items);

        let legend = new Set([...dependencies, ...items.map(i => i.name)]);
        legend = Array.from(legend).sort().map(entry => {
            return `<li class="legend__item"><span class="legend__term">${shortNames.get(entry)?.shortName}</span> <span class="legend__definition">${entry}</span></li>`;
        }).join('');

        let table = `
            <h1 class="tabs__title" data-tab-id="${id}">${title}</h1>
            <div class="tabs__item">
                ${headerButtons ? headerButtons : ''}
                <div class="legend-container"><h2>Legende</h2><dl class="legend">${legend}</dl></div>
                <div class="dependency-table-wrapper">
                    <table class="dependency-table" style="--cols: ${dependencies.length + 1}">
                        <tr><th></th>${header}</tr>
                        ${rows}
                    </table>
                </div>
                <ul class="dependency-list">${shortList}</ul>
            </div>`;

        el.innerHTML = table;

        for (let rowId = 0; rowId < dependencies.length; rowId++) {
            for (let colId = 0; colId < dependencies.length; colId++) {
                const cell = el.querySelector(`td[data-row="${rowId}"][data-col="${colId}"]`);

                cell.classList.toggle('not-needed', rowId >= colId);

                if (rowId === dependencies.length - 1) {
                    const colCells = el.querySelectorAll(`td[data-col="${colId}"]`);

                    if (Array.from(colCells).reduce((a, c) => {
                        return a && (c.matches('.not-needed') || c.matches(':empty'));
                    }, true)) {
                        el.querySelectorAll(`tr [data-col="${colId}"]`).forEach(td => {
                            td.classList.add('cell-not-needed');
                        });
                    }
                }
            }

            const rowCells = el.querySelectorAll(`td[data-row="${rowId}"]`);

            console.log(rowCells);
            if (Array.from(rowCells).reduce((a, c) => {
                console.log(c);
                return a && (c.matches('.not-needed') || c.matches(':empty') || c.matches('.not-needed'));
            }, true)) {
                el.querySelector(`td[data-row="${rowId}"]`).closest('tr').classList.add('row-not-needed');
            }
        }

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
        const table = dependencies.map((dRow, keyRow) => {
            const cells = dependencies.map((dCol, keyCol) => {
                const possibleResults = items.filter(item => {
                    return dRow !== dCol && item.dependencies.includes(dRow) && item.dependencies.includes(dCol);
                }).map(item => {
                    let unmetDependency = item.dependencies.filter(dep => {
                        return dep !== dCol && dep !== dRow;
                    });

                    return {
                        name: item.name.trim(),
                        formula: item.formula,
                        unmetDependency,
                    }
                });

                return {
                    col: keyCol,
                    row: keyRow,
                    possibleResults
                }
            });

            return {
                header: {
                    row: keyRow,
                    name: dRow,
                },
                cells,
            }
        });

        return table.map((row) => {
            const cells = row.cells.map((cell) => {
                const possibleResults = cell.possibleResults.map(result => {
                    const unmetDependency = result.unmetDependency.length ? `<sup>*</sup> <em class="unmet">(${result.unmetDependency.join(', ')})</em>` : '';

                    return `<div class="result">${shortNames.getSwitchMarkup(result.name)}${unmetDependency}<div class="formula">${result.formula}</div></div>`;
                }).join('');

                return `<td data-col="${cell.col}" data-row="${cell.row}">${possibleResults}</td>`;
            }).join('');

            return `<tr><th data-row="${row.header.row}">${shortNames.getSwitchMarkup(row.header.name)}</th>${cells}</tr>`;
        });
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
                    <span class="dependency-list__sub-description">${dep.dependencies.filter(dep => dep !== dependency).map(dep => shortNames.getSwitchMarkup(dep)).join(', ')}</span>
                    <span class="dependency-list__sub-description">${shortNames.getSwitchMarkup(dep.name)}</span>
                    <span class="dependency-list__sub-description">${dep.formula} = ${dep.name}</span>`;
            }).join('')

            return `
                    <dt class="dependency-list__title" style="--dep-length: ${dependants.length}">${shortNames.getSwitchMarkup(dependency)}</dt>
                    <dd class="dependency-list__description">${dependantsHtml}</dd>
            `;
        }).join('');
    }
}

export default LookupTable;
