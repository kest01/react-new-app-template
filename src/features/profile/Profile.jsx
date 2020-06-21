import React from "react";
import {Preloader} from "../../common/components/preloader";
import LoginForm from "../../common/components/login-form";

import type { ProfileType } from "../../redux/reducers";

type ProfileProps = ProfileType & {
    loadProfileDataAction: () => void,
    loginAction: (string, string) => Promise<void>,
}


export default class Profile extends React.Component<ProfileProps> {

    componentDidMount(): void {
        this.props.loadProfileDataAction()
    }


    render() {
        if (!this.props.isLoading) {
            return <Preloader/>
        } else if (this.props.errorMessage) {
            return <h1>Error: {this.props.errorMessage}</h1>
        } else if (!this.props.isAuthorized) {
            return <LoginForm loginAction={ this.props.loginAction } onSuccess={ this.props.loadProfileDataAction }/>
        } else {
            return <h1>{this.props.profileContent}</h1>
        }
    }
}