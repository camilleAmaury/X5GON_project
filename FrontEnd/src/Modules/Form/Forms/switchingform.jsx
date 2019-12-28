import React, { Component } from 'react';

import './switchingform.scss';

import SwitchingFormChild from './switchingformchild';

export default class SwitchingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    handleSubmitSignUp = event => {
        event.preventDefault();
        console.log("SignUp");
        this.props.onSubmit(event);
    }

    handleSubmitSignIn = event => {
        event.preventDefault();
        console.log("SignIn");
        this.props.onSubmit(event);
    }

    render() {
        return (
            <div className={"container"} id={"container"}>
                <SwitchingFormChild className={"form-container sign-up-container"} title={"Create Account"} text={"use your email for registration"}
                    isSignIn={false} onSubmit={this.handleSubmitSignUp} buttonText={"Sign Up"} number={"zero"}></SwitchingFormChild>
                <SwitchingFormChild className={"form-container sign-in-container"} title={"Sign in"} text={"use your account"}
                    isSignIn={false} onSubmit={this.handleSubmitSignIn} buttonText={"Sign In"} number={"un"}></SwitchingFormChild>
                <div className={"overlay-container"}>
                    <div className={"overlay"}>
                        <div className={"overlay-panel overlay-left"}>
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className={"ghost"} id={"signIn"}>Sign In</button>
                        </div>
                        <div className={"overlay-panel overlay-right"}>
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className={"ghost"} id={"signUp"}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}