import ShortNameCollection from './modules/ShortNameCollection.js';

export const delegate = (selector, fn) => {
    return e => {
        if (e.target.closest(selector)) {
            fn(e);
        }
    }
}

export const updateDownloadButton = () => {
    const data = localStorage.getItem('tables');
    const linkUrl = `data:text/json;charset=utf-8,${encodeURIComponent(data)}`;
    const linkTag = document.querySelector('#download-button');
    const date = (new Date()).toISOString();

    linkTag.download = `Lookuptabelle (${date}).json`
    linkTag.href = linkUrl;
};

export const shortNames = new ShortNameCollection();
