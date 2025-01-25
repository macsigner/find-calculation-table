import '../style.scss'
import { data } from './includes/data.js';
import { delegate } from './includes/tools.js';

const dependencies = Array.from(new Set(data.cashflowAnalysis.flatMap(d => d.dependencies))).sort();

let header = dependencies.map((dRow, dKey) => `<th data-col="${dKey}">${dRow}</th>`).join('');

let rows = dependencies.map((dRow, keyRow) => {
    const cells = dependencies.map((dCol, keyCol) => {
        const possibleResults = data.cashflowAnalysis.filter(item => {
            return dRow !== dCol && item.dependencies.includes(dRow) && item.dependencies.includes(dCol);
        }).map(item => {
            return `<div class="result">${item.name}<div class="formula">${item.formula}</div></div>`;
        }).join('');


        return `<td data-col="${keyCol}" data-row="${keyRow}">${possibleResults}</td>`;
    }).join('');

    return `<tr><th data-row="${keyRow}">${dRow}</th>${cells}</tr>`;
}).join('');

let table = `
<table style="--cols: ${dependencies.length + 1}">
    <tr><th></th>${header}</tr>
    ${rows}
</table>
`;

document.querySelector('#app').innerHTML = table;

document.addEventListener('click', delegate('[data-row]', e => {
    const i = e.target.closest('[data-row]').dataset.row;

    document.querySelectorAll('.active-row').forEach(el => el.classList.remove('active-row'));
    document.querySelectorAll(`[data-row="${i}"]`).forEach(el => el.classList.add('active-row'));
}))

document.addEventListener('click', delegate('[data-col]', e => {
    const i = e.target.closest('[data-col]').dataset.col;

    document.querySelectorAll('.active-col').forEach(el => el.classList.remove('active-col'));
    document.querySelectorAll(`[data-col="${i}"]`).forEach(el => el.classList.add('active-col'));
}))
