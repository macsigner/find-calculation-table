import App from './includes/modules/App.js';
import './includes/modules/DataEntry.js';
import {delegate} from './includes/tools.js';

document.querySelectorAll('#app').forEach(el => new App(el));

let prevClasses;

const checkForm = () => {
    const formData = new FormData(document.querySelector('[data-global-settings]'));
    let classes = [];

    for (let entry of formData.entries()) {
        classes.push(`${entry[0]}-${entry[1]}`)
    }

    if (prevClasses) {
        prevClasses.forEach(cssClass => document.documentElement.classList.remove(cssClass));
    }

    classes.forEach(cssClass => document.documentElement.classList.add(cssClass));
    prevClasses = classes;
}
document.querySelector('[data-global-settings]')?.addEventListener('input', () => checkForm());

checkForm();

document.addEventListener('click', delegate('[data-toggle]', e => {
    document.querySelector(e.target.closest('[data-toggle]').dataset.toggle).classList.toggle('active');
}));
