// @flow
import * as types from './types';
import axios from '../common/http-common';

export type Actions = {
    loadDataAction: () => void,
    changeTabAction: (number) => void,
    submitForm: (form: {}) => void,
    loginAction: (string, string) => Promise<void>,
    loadProfileDataAction: () => void,
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

export const loginAction = (username: string, password: string) => (dispatch: any) => new Promise<void>((resolve, reject) => {
    console.log(`loginAction. username: ${username}, password: ${password}`);
    axios.post('/auth/login', { username, password })
        .then((res) => {
            console.log('Login submitted: ', res);
            if (res.data.accessToken) {
                localStorage.setItem("profile", JSON.stringify(res.data));
            }
            resolve();
        })
        .catch((err) => {
            console.log('Error on Login submission: ', err);
            if (err.response.status === 404) {
                reject("User not found");
            } else if (err.response.status === 401) {
                reject("Incorrect password");
            }
            reject("Unexpected error on login");
        });
});

export const loadProfileDataAction = () => (dispatch: any) => {
    axios.get('/profile', { headers: authHeader() })
        .then((res) => {
            console.log('Profile loaded: ', res);
            dispatch({
                type: types.LOAD_PROFILE_DATA_REQUEST,
                content: res.data.message
            })
        })
        .catch((err) => {
            console.log('Error on Login submission: ', err.response);
            if (err.response.status === 403) {
                dispatch({
                    type: types.PROFILE_NOT_AUTHORIZED,
                })
            } else {
                dispatch({
                    type: types.PROFILE_ERROR,
                    errorMessage: String(err)
                })

            }
        });
};

const authHeader = () => {
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');

    if (profile && profile.accessToken) {
        // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
        return { 'x-access-token': profile.accessToken };       // for Node.js Express back-end
    } else {
        return {};
    }
}