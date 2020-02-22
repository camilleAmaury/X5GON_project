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
            isLogged:false
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
    }

    handleSubmitSignUp = (obj) => {
        axios.post('http://185.157.246.81:5000/user', obj)
        .then(request => {
            console.log(request)
            // let res = request.data;
            // if(res === -2){
            //     this.setState({
            //         errorSignIn:"Empty field"
            //     });
            // }else if(res === -1){
            //     this.setState({
            //         errorSignIn:"Username already exists"
            //     });
            // }
            // else{
            //     localStorage.setItem("isConnected", {id:request.data.id_user});
            //     this.setState({
            //         isLogged:true
            //     });
            // }
        })
        .catch(error => {
            console.log(error.response);
            console.log("this doesn't work");
            this.setState({
                errorSignIn:"Error from server"
            });
        });
    }

    handleSubmitSignIn = (obj) => {
        axios.get(`http://185.157.246.81:5000/login/${obj.username}/${obj.pwd}`)
        .then(request => {
            if(request.data){
                localStorage.setItem("isConnected", {id:request.data.id_user});
                this.setState({
                    isLogged:true
                });
            }else{
                this.setState({
                    errorLogIn:"Username and password combination doesn't exists"
                });
            }
            
        })
        .catch(error => {
            console.log(error.response);
            console.log("this doesn't work");
            this.setState({
                errorLogIn:"Error from server"
            });
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
                            <h1>Welcome on Knowledge's Recipe</h1>
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