// @flow
import React from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';

type LoginEntity = {
    username: string,
    password: string,
}

type Props = {
    classes: {root: { }},
    loginAction: (string, string) => Promise<void>,
    onSuccess: () => void,
}

type State = {
    entity: LoginEntity,
}

const styles = {
    root: {
        '& > *': {
            margin: 8,
        },
    },
};

class LoginForm extends React.Component<Props, State> {

    constructor() {
        super( ...arguments );
        this.state = {
            entity: {
                username: '',
                password: '',
            }
        };
    }

    updateEntity = (field: string, value: any ) => {
        this.setState({
            entity: {
                ...this.state.entity,
                [field]: value
            }
        });
    }

    handleEntityChange = (event: any) => {
        this.updateEntity(event.target.name, event.target.value)
    }

    submitForm = () => {
        this.props.loginAction(this.state.entity.username, this.state.entity.password)
            .then(() => {
                this.props.onSuccess();
            })
            .catch((errorMessage) => {
                alert(errorMessage);
            });
    }

    render() {
        return (
            <div>
                <form noValidate autoComplete="off">
                    <Grid container spacing={5} direction="column" alignItems="center" className={this.props.classes.root}>
                        <TextField required id="username" name="username" label="Имя пользователя" variant="outlined"
                                   value={this.state.entity.username} onChange={this.handleEntityChange}/>
                        <TextField required id="password" name="password" label="Пароль" variant="outlined" type="password" autoComplete="current-password"
                                   value={this.state.entity.password} onChange={this.handleEntityChange}/>
                        <Button color="primary" variant="contained" onClick={ this.submitForm }>Authorize</Button>
                    </Grid>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(LoginForm);