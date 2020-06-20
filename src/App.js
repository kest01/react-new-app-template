// @flow
import React from 'react';
import { connect } from 'react-redux';
import AppBar from "@material-ui/core/AppBar";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Preloader } from "./common/components/preloader";
import * as actions from "./redux/actions";
import { history } from './redux/store';
import { tabIndexToPath } from './common/utils/tab-utils';
import { FormsTab } from "./common/components/forms-tab";
import './App.css';

import type { AppStore } from './redux/reducers'
import type { Actions } from './redux/actions'


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export class App extends React.Component<Actions & { store: AppStore }> {

    componentDidMount(): void {
        this.props.loadDataAction()
    }

    handleChange = (event: Event, newValue: number) => {
        this.props.changeTabAction(newValue);
        history.push(tabIndexToPath(newValue));
    };

    render() {
        if (!this.props.store.initialized) {
            return <Preloader/>
        } else {
            const {activeTab} = this.props.store;
            return (
                <div>
                    <AppBar position="static">
                        <Tabs value={activeTab} onChange={this.handleChange} aria-label="simple tabs example">
                            <Tab label="Forms"/>
                            <Tab label="Modals"/>
                        </Tabs>
                    </AppBar>
                    <TabPanel value={activeTab} index={0}>
                        <FormsTab submitForm={ this.props.submitForm } />
                    </TabPanel>
                    <TabPanel value={activeTab} index={1}>
                        Item Two
                    </TabPanel>
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = {
    ...actions
};

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);
