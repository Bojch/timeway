/**
 * Multi Merge - murge multiple object into one
 * @param {Object} obj - Object you want to add multiple objects
 * @param {Array} array - Array of object to add them to 'obj'
 * @returns Merged object
 */
const MultiMerge = (function () {
    const merge = (obj, array) => {
        if (!Array.isArray(array) || array.length === 0) return {};

        let o = array.pop();

        merge(obj, array);

        return Object.assign(obj, o);
    };

    return { merge: merge };
})();

module.exports = MultiMerge;
