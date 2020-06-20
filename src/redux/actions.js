// @flow
import * as types from './types';
import axios from '../common/http-common';

export type Actions = {
    loadDataAction: () => void,
    changeTabAction: (number) => void,
    submitForm: (form: {}) => void,
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

export const submitForm = (form: {}) => (dispatch: any) => {
    console.log('Submit form: ', form);
    axios.post('/forms', form)
        .then((res) => {
            console.log('Successfully submitted: ', res);
        })
        .catch((res) => {
            console.log('Error on form submission: ', res);
        });
};
