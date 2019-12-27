import React, { Component } from 'react';

import './Login.css'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:true
        }
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    render() {
        return (
            this.state.isLoading ? <div>Loading</div>: <div>Hello World</div>
        );
    }
}