import React, { Component } from 'react';

import SwitchingForm from './Forms/switchingform';

import './Login.scss';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            form:"login_form"
        }
    }

    componentDidMount = () => {
        this.setState({isLoading:false})
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading:true});
    }

    render() {
        return (
            <div id={"login"}>
                <SwitchingForm onSubmit={this.handleSubmit}></SwitchingForm>
            </div>
        );
    }
}