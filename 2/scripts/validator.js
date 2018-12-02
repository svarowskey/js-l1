let validators = {
    validateLength(min, max, value) {
        return value.length >= min && value.length <= max;
    },

    validateForNumber(value) {
        return typeof value === "number" && !isNaN(value);
    },
};