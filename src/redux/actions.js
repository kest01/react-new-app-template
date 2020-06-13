// @flow
import * as types from './types';

export type Actions = {
    loadDataAction: () => void,
    changeTabAction: (number) => void,
}

export const loadDataAction = () => (dispatch: any) => {
    new Promise(resolve => setTimeout(resolve, 1000)).then(() => dispatch({
        type: types.LOAD_DATA_REQUEST,
    }))
};

export const changeTabAction = (newTab: number) => (dispatch: any) => {
    dispatch({
        type: types.CHANGE_TAB_REQUEST,
        newTab,
    });
};
