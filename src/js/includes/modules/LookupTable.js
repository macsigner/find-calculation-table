
import { delegate, updateDownload } from '../tools.js';
import { data } from '../data.js';

localStorage.setItem('tables', JSON.stringify(data));

updateDownload();

class LookupTable {
    constructor(el, data = data.cashflowAnalysis) {
        const items = data.items;
        const title = data.title;
        const dependencies = Array.from(new Set(items.flatMap(d => d.dependencies))).sort();

        let header = dependencies.map((dRow, dKey) => `<th data-col="${dKey}">${dRow}</th>`).join('');

        let rows = dependencies.map((dRow, keyRow) => {
            const cells = dependencies.map((dCol, keyCol) => {
                const possibleResults = items.filter(item => {
                    return dRow !== dCol && item.dependencies.includes(dRow) && item.dependencies.includes(dCol);
                }).map(item => {
                    return `<div class="result">${item.name}<div class="formula">${item.formula}</div></div>`;
                }).join('');


                return `<td data-col="${keyCol}" data-row="${keyRow}">${possibleResults}</td>`;
            }).join('');

            return `<tr><th data-row="${keyRow}">${dRow}</th>${cells}</tr>`;
        }).join('');

        let table = `
            <h1>${title}</h1>
            <table style="--cols: ${dependencies.length + 1}">
                <tr><th></th>${header}</tr>
                ${rows}
            </table>`;

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
}

export default LookupTable;
