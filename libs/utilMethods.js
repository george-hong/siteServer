const ObjectToString = value => Object.prototype.toString.call(value);

const getPrototype = value => ObjectToString(value).slice(8, -1);

const isObject = (value) => {
    return getPrototype(value) === 'Object';
};

const isFunction = (value) => {
    return getPrototype(value) === 'Function';
}

const isArray = (value) => {
    return getPrototype(value) === 'Array';
}

module.exports = {
    ObjectToString,
    isObject,
    isFunction,
    isArray
};