/**
 * @module Build-tools
 */

const fs = require('fs');

/**
 * Recursively copies a file or directory from `src` to `dest`.
 *
 * @param {string} src - Path of the source file/directory.
 * @param {string} dest - Destination path.
 */
const copy = (src, dest) => {
    if (fs.existsSync(src)) {
        fs.cp(src, dest, {
            recursive: true
        }, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
};

/**
 * Creates a debounced version of the provided function.
 * The returned wrapper delays invoking `fn` until after `ms` milliseconds have elapsed since the last call.
 *
 * @param {Function} fn - Function to debounce.
 * @param {number} ms - Delay in milliseconds.
 * @returns {Function} Debounced function.
 */
const debounce = (fn, ms) =>{
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
};

// Debounced copy helper (50ms)
const debouncedCopy = debounce((src, dest) => copy(src, dest), 50);

/**
 * Watches a file for changes and copies it to the destination.
 * Performs an initial copy before watching.
 *
 * @param {string} src - Source file path.
 * @param {string} dest - Destination file path.
 */
async function watchAndCopyFile(src, dest) {
    try { await copy(src, dest); } catch (e) { console.error(e); }
    fs.watch(src, { recursive: true }, async (eventType) => {
        if (eventType === 'change') await debouncedCopy(src, dest);
    });
}

/**
 * Watches a directory for changes and copies it recursively to the destination.
 * Performs an initial copy before watching.
 *
 * @param {string} src - Source directory path.
 * @param {string} dest - Destination directory path.
 */
async function watchAndCopyDir(src, dest) {
    try { await copy(src, dest); } catch (e) { console.error(e); }
    fs.watch(src, { recursive: true }, async (eventType) => {
        if (eventType === 'change') await debouncedCopy(src, dest);
    });
}

module.exports = { copy, debounce, watchAndCopyFile, watchAndCopyDir };