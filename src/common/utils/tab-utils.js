const tabMapping = {
    '0': '/forms',
    '1': '/modals',
}

export const pathToTabIndex = (path: string): number => {
    const tabIndexString = Object.keys(tabMapping).find(key => tabMapping[key].toLowerCase() === path)
    if (tabIndexString) {
        return parseInt(tabIndexString)
    } else {
        return 0;
    }
};

export const tabIndexToPath = (tabIndex: number): string => {
    return tabMapping[tabIndex] || '/'
};
