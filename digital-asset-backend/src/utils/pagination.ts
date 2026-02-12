import { ParsedQs } from "qs";

export interface PaginationResult {
    page: number;
    limit: number;
    skip: number;
}

interface PaginationQuery extends ParsedQs {
    page?: string;
    limit?: string;
}

export const getPagination = (
    query: PaginationQuery
): PaginationResult => {
    const page =
        typeof query.page === "string" && !isNaN(Number(query.page))
            ? Number(query.page)
            : 1;

    const limit =
        typeof query.limit === "string" && !isNaN(Number(query.limit))
            ? Number(query.limit)
            : 10;

    const skip = (page - 1) * limit;

    return { page, limit, skip };
};
