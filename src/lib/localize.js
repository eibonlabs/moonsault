
/**
 * Localizes text by evaluating `data-localize` attributes and retrieving
 * corresponding translations from `moonsault.localization` based on the
 * current `moonsault.language`.
 *
 * @function localize
 * @param {HTMLElement} element - The root element to search for localized strings.
 * @returns {HTMLElement} The same element, after updating its descendant
 *          text nodes.
 */
const localize = (element) => {
    console.log(element)
    if (!(element instanceof HTMLElement)) {
        throw new TypeError('element must be an HTMLElement');
    }

    const localization = moonsault.localization;
    const language = moonsault.language;

    if (!localization || !language) {
        console.warn('Localization or language not set; skipping translation.');
        return element;
    }

    const nodes = element.querySelectorAll('[data-localize]');

    for (const el of nodes) {
        const key = el.getAttribute('data-localize');
        if (!key) continue;
        const translation = localization[language][key];
        el.textContent = translation !== undefined ? translation : el.textContent;
    }

    return element;
};

export { localize };