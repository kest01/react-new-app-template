import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: null,
        };
    }

    handleChange = (event, newValue) => {
        this.setState({ activeTab: newValue});
    };

    render() {
        const { activeTab } = this.state;
        return (
            <div>
                <AppBar position="static">
                    <Tabs value={activeTab} onChange={this.handleChange} aria-label="simple tabs example">
                        <Tab label="Forms" />
                        <Tab label="Modals" />
                    </Tabs>
                </AppBar>
                <TabPanel value={activeTab} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={activeTab} index={1}>
                    Item Two
                </TabPanel>
            </div>
        );
    }
}
