import * as types from './types';
import { pathToTabIndex } from '../common/utils/tab-utils';

export type AppStore = {
    initialized: boolean,
    activeTab: number,
}

export const initialState: AppStore = {
    initialized: false,
    activeTab: 0,
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
/*        case types.LOCATION_CHANGE:
            const newTab = pathToTabIndex(action.payload.location.pathname);
            const newCountry = newTab === 2 ? queryString.parse(action.payload.location.search).country : undefined;
            return {
                ...state,
                activeTab: pathToTabIndex(action.payload.location.pathname),
                selectedCountry: newCountry ? newCountry : state.selectedCountry,
            };
        case types.ADD_COUNTRY_TO_COMPARISON:
            return {
                ...state,
                comparisonCountries: state.comparisonCountries.includes(action.country)
                    ? state.comparisonCountries
                    : state.comparisonCountries.push(action.country),
            };
        case types.REMOVE_COUNTRY_FROM_COMPARISON:
            return {
                ...state,
                comparisonCountries: state.comparisonCountries.filter(value => value !== action.country),
            };
        case types.UPDATE_CHART_THRESHOLD:
            return {
                ...state,
                chartThreshold: action.newThreshold,
            };*/
        default:
            return state
    }
}
