export const delegate = (selector, fn) => {
    return e => {
        if (e.target.closest(selector)) {
            fn(e);
        }
    }
}

export const updateDownload = () => {
    const data = localStorage.getItem('tables');
    const linkUrl = `data:text/json;charset=utf-8,${encodeURIComponent(data)}`;
    const linkTag = document.querySelector('#download-button');
    linkTag.download = 'dl.json'
    linkTag.href = linkUrl;
};
