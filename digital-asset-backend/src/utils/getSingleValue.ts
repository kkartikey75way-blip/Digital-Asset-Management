export const getSingleValue = (
    value: string | string[] | undefined
): string => {
    if (!value) {
        throw new Error("Parameter missing");
    }

    return Array.isArray(value) ? value[0] : value;
};
