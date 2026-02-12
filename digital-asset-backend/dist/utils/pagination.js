"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = void 0;
const getPagination = (query) => {
    const page = typeof query.page === "string" && !isNaN(Number(query.page))
        ? Number(query.page)
        : 1;
    const limit = typeof query.limit === "string" && !isNaN(Number(query.limit))
        ? Number(query.limit)
        : 10;
    const skip = (page - 1) * limit;
    return { page, limit, skip };
};
exports.getPagination = getPagination;
