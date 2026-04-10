/**
 * @description Binds a property on a context object to a DOM element or callback.
 * @function bind
 * @param {object} context - The object that holds the data model.
 * @param {string} propName - Name of the property to bind.
 * @param {*} initialValue - Initial value to set on the model.
 * @param {Object|Function} elementOrCallback - Either an element whose
 *   `value`/`textContent` will be updated, or a function called with the
 *   current value.
 * @returns {void}
 */
const bind = (context, propName, initialValue, elementOrCallback) => {
    // Argument validation
    if (!context || typeof context !== 'object') {
        throw new TypeError('context must be an object');
    }
    if (typeof propName !== 'string' || propName.length === 0) {
        throw new TypeError('propName must be a non-empty string');
    }
    if (elementOrCallback == null) {
        throw new Error('elementOrCallback cannot be null or undefined');
    }

    // Internal storage key
    const storageKey = `_${propName}`;

    // Apply the latest value to the element or callback
    const apply = () => {
        const value = context[storageKey];
        if (typeof elementOrCallback === 'object' && elementOrCallback !== null) {
            // Update DOM element if it has a matching property
            if ('value' in elementOrCallback && typeof elementOrCallback.value !== 'undefined') {
                elementOrCallback.value = value;
            } else if ('textContent' in elementOrCallback && typeof elementOrCallback.textContent !== 'undefined') {
                elementOrCallback.textContent = value;
            }
        } else if (typeof elementOrCallback === 'function') {
            elementOrCallback(value);
        }
    };

    // Setter that stores the value and triggers UI update
    Object.defineProperty(context, propName, {
        enumerable: true,
        configurable: true,
        set: (value) => {
            context[storageKey] = value;
            apply();
        },
        get: () => context[storageKey],
    });

    // Initialize with the provided value
    context[propName] = initialValue;
    apply();
};

export { bind };