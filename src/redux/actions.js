// @flow
import * as types from './types';

export type Actions = {
    loadDataAction: () => void,
    changeTabAction: (number) => void,
}

export const loadDataAction = () => (dispatch: any) => {
    new Promise(resolve => setTimeout(resolve, 2000)).then(() => dispatch({
        type: types.LOAD_DATA_REQUEST,
    }))
};

export const changeTabAction = (newTab: number) => (dispatch: any) => {
    dispatch({
        type: types.CHANGE_TAB_REQUEST,
        newTab,
    });
};

/*
export const addCountryToComparisonAction = (country: string) => (dispatch: any) => {
    dispatch({
        type: types.ADD_COUNTRY_TO_COMPARISON,
        country,
    });
};

export const removeCountryFromComparisonAction = (country: string) => (dispatch: any) => {
    dispatch({
        type: types.REMOVE_COUNTRY_FROM_COMPARISON,
        country,
    });
};

export const updateChartThresholdAction = (newThreshold: number) => (dispatch: any) => {
    dispatch({
        type: types.UPDATE_CHART_THRESHOLD,
        newThreshold,
    });
};
*/
