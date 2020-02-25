import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

import './switchingform.scss';

import SwitchingFormChild from './switchingformchild';

export default class SwitchingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorLogIn:"",
            errorSignIn:"",
            isLogged:false,
            server:"",
            config:{}
        }
    }

    componentDidMount = () => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container-login');

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
        let server = (process.env.REACT_APP_DEV === "1" ? process.env.REACT_APP_SERVER_DEV : process.env.REACT_APP_SERVER);
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        this.setState({server:server, config:config});
    }

    handleSubmitSignUp = (obj) => {
        axios.post(`${this.state.server}users/`, obj, this.state.config)
        .then(request => {
            if(request.status === 201){
                let obj = JSON.stringify({id:request.data.user_id, username:request.data.username, image:request.data.user_image});
                localStorage.setItem("isConnected", obj);
                this.setState({
                    errorSignIn:""
                });
            }else{
                this.setState({
                    errorSignIn:"Server Error, call a dev !"
                });
            }
        })
        .catch(error => {
            if(error.status === 409){
                this.setState({
                    errorSignIn:"Username already existing"
                });
            }else if(error.status === 422){
                this.setState({
                    errorSignIn:error.data
                });
            }else{
                this.setState({
                    errorSignIn:"Server Error, call a dev !"
                });
            }
        });
    }

    handleSubmitSignIn = (obj) => {
        axios.post(`${this.state.server}authentication/login`, obj, this.state.config)
        .then(request => {
            if(request.status === 201){
                let obj = JSON.stringify({id:request.data.user_id, username:request.data.username, image:request.data.user_image});
                localStorage.setItem("isConnected", obj);
                this.setState({
                    errorLogIn:""
                });
            }else{
                this.setState({
                    errorLogIn:"Server Error, call a dev !"
                });
            }
        })
        .catch(error => {
            if(error.status === 409){
                this.setState({
                    errorLogIn:"Username not found"
                });
            }else if(error.status === 403){
                this.setState({
                    errorLogIn:"Wrong password"
                });
            }else if(error.status === 422){
                this.setState({
                    errorLogIn:"Input not specified"
                });
            }else{
                this.setState({
                    errorLogIn:"Server Error, call a dev !"
                });
            }
        });
    }
    isConnected = () => {
        if(localStorage.getItem("isConnected") !== null && localStorage.getItem("isConnected") !== undefined){
            return <Redirect to='/Panel'/>;
        }
    }

    render() {
        return (
            <div className={"container-init"} id={"container-login"}>
                {this.isConnected()}
                <SwitchingFormChild className={"form-container sign-up-container"} title={"Create Account"} text={this.state.errorSignIn}
                    isSignIn={false} onSubmit={this.handleSubmitSignUp} buttonText={"Sign Up"} number={"zero"}></SwitchingFormChild>
                <SwitchingFormChild className={"form-container sign-in-container"} title={"Sign in"} text={this.state.errorLogIn}
                    isSignIn={true} onSubmit={this.handleSubmitSignIn} buttonText={"Sign In"} number={"un"}></SwitchingFormChild>
                <div className={"overlay-container"}>
                    <div className={"overlay"}>
                        <div className={"overlay-panel overlay-left"}>
                            <h1>Hello foreigner !</h1>
                            <p>In order to pursue, register yourself</p>
                            <button className={"ghost"} id={"signIn"}>Sign In</button>
                        </div>
                        <div className={"overlay-panel overlay-right"}>
                            <h1>Welcome on Gako</h1>
                            <p>This application was created for the X5GON 2020 hackathon by <a href={"https://www.linkedin.com/in/vincent-kowalski-b7868b166/"}  target="_blank" rel="noopener noreferrer">Vincent Kowalski</a>, <a href={"https://www.linkedin.com/in/camille-amaury-juge/"}  target="_blank" rel="noopener noreferrer">Camille-Amaury Juge</a> and <a href={"https://www.linkedin.com/in/aniss-bentebib-a449a8155/"}  target="_blank" rel="noopener noreferrer">Aniss Bentebib</a>.</p>
                            <p>LogIn in order to continue.</p>
                            <button className={"ghost"} id={"signUp"}>Sign Up</button>
                        </div>
                    </div>
                </div>
                {this.state.isLogged ? <Redirect to='/Panel'/> : ""}
            </div>
        );
    }
}