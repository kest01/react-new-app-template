// @flow
import React from 'react';

type PropsType = {
    children : any,
    textOnError : string,
};

type StateType = {
    hasError : boolean,
};

export default class ErrorBoundary extends React.Component<PropsType, StateType> {

    constructor( ) {
        super( ...arguments );
        this.state = { hasError: false };
    }

    componentDidCatch(error : Error, info : {}) {
        // Display fallback UI
        this.setState({ hasError: true });
        console.error( error );
        console.error( info );
    }

    render() {
        if ( this.state.hasError ) {
            console.log(this.props.textOnError)
            // return <Alert variant="danger">{this.props.textOnError}</Alert>;
            return <div>{this.props.textOnError}</div>;
        }

        return this.props.children;
    }
}
