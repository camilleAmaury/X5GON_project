import React, { Component } from 'react';

import './switchingform.scss';

import ThreeDButton from '../Button/3dbutton';

export default class SwitchingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            form: "login_form"
        }
    }

    componentDidMount = () => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("lol");
        this.setState({ isLoading: true });
    }

    render() {
        return (
            <div className={this.props.className}>
                <form>
                    <h1>{this.props.title}</h1>
                    <span className={"space"}></span>
                    <span>{this.props.text}</span>
                    {this.props.isSignIn ? "" : <input type={"text"} placeholder={"Name"} />}
                    <input type={"email"} placeholder={"Email"} />
                    <input type={"password"} placeholder={"Password"} />
                    {this.props.isSignIn ? <a href={"#"}>Forgot your password?</a> : "" }
                    <span className={"space"}></span>
                    <ThreeDButton text={this.props.buttonText} onSubmit={this.props.onSubmit} number={this.props.number}></ThreeDButton>
                </form>
            </div>
        );
    }
}