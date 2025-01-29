import App from './includes/modules/App.js';
import './includes/modules/DataEntry.js';

document.querySelectorAll('#app').forEach(el => new App(el));

let prevClasses;
document.querySelector('[data-global-settings]')?.addEventListener('input', e => {
    const formData = new FormData(e.target.form);
    let classes = [];

    for (let entry of formData.entries()) {
        classes.push(`${entry[0]}-${entry[1]}`)
    }

    if (prevClasses) {
        prevClasses.forEach(cssClass => document.documentElement.classList.remove(cssClass));
    }

    classes.forEach(cssClass => document.documentElement.classList.add(cssClass));
    prevClasses = classes;
});
