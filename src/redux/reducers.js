import * as types from './types';
import { pathToTabIndex } from '../common/utils/tab-utils';

export type ProfileType = {
    isLoading: boolean,
    isAuthorized: boolean,
    profileContent: string,
    errorMessage: string,
}

export type AppStore = {
    initialized: boolean,
    activeTab: number,
    profile: ProfileType,
}

export const initialState: AppStore = {
    initialized: false,
    activeTab: 0,
    profile: {
        isLoading: true,
        isAuthorized: false,
        profileContent: 'No content',
    }
};

export default (state: AppStore = initialState, action: any): AppStore => {
    console.log('Reducer: ' + action.type);
    console.log(action);
    switch (action.type) {
        case types.LOAD_DATA_REQUEST:
            return {
                ...state,
                initialized: true
            };
        case types.CHANGE_TAB_REQUEST:
            return {
                ...state,
                activeTab: action.newTab,
            };
        case types.LOCATION_CHANGE:
            console.log('LOCATION_CHANGE: ' + action.payload.location.pathname)
            return {
                ...state,
                activeTab: pathToTabIndex(action.payload.location.pathname),
            };
        case types.LOAD_PROFILE_DATA_REQUEST:
            return {
                ...state,
                profile: {
                    isLoading: true,
                    isAuthorized: true,
                    profileContent: action.content,
                    errorMessage: null,
                }
            };
        case types.PROFILE_NOT_AUTHORIZED:
            return {
                ...state,
                profile: {
                    isLoading: true,
                    isAuthorized: false,
                    ...state.profile,
                }
            };
        case types.PROFILE_ERROR:
            return {
                ...state,
                profile: {
                    isLoading: true,
                    isAuthorized: false,
                    errorMessage: action.errorMessage,
                    ...state.profile,
                }
            };
        default:
            return state
    }
}
