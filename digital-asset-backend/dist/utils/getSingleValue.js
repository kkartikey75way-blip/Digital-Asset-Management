"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleValue = void 0;
const getSingleValue = (value) => {
    if (!value) {
        throw new Error("Parameter missing");
    }
    return Array.isArray(value) ? value[0] : value;
};
exports.getSingleValue = getSingleValue;
