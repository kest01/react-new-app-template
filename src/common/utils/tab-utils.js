import * as R from 'ramda';
import { Maybe, fst, snd } from './functional';

const tabMapping = {
    0: '/forms',
    1: '/modals',
}

// Functions style
export const pathToTabIndex = (path: string): number => {
    const toLowerSafe = (s) => Maybe(s).map(R.toLower).getOrElse('')
    const findPairByPath = R.find(R.pipe(snd, R.equals(toLowerSafe(path))))

    return Maybe(tabMapping).map(R.toPairs).map(findPairByPath).map(fst).map(parseInt).getOrElse(0)
}

// Imperative style
/*
export const pathToTabIndex = (path: string): number => {
    const tabIndexString = Object.keys(tabMapping).find(key => tabMapping[key].toLowerCase() === path)
    if (tabIndexString) {
        return parseInt(tabIndexString)
    } else {
        return 0;
    }
};*/

export const tabIndexToPath = (tabIndex: number): string => {
    return tabMapping[tabIndex] || '/'
};
