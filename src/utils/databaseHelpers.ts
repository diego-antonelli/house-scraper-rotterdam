export const generateSort = <T>(key: keyof T, descending = false) => {
    return {
        [key]: descending ? -1 : 1,
    };
};
