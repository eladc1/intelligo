// from https://github.com/lodash/lodash/blob/master/isObject.js
export const isObject = (value): boolean => {
    const type = typeof value;
    return value != null && (type === 'object' || type === 'function');
};

