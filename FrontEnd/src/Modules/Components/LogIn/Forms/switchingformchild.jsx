import React, { Component, Fragment } from 'react';
import sha256 from 'js-sha256';

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
        const container = document.getElementById('container-login');

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }

    handleSubmit = () => {
        let obj = {};
        if(!this.props.isSignIn){
            let phone = document.getElementById('phone-field').value;
            let identifier = document.getElementById('identifier-field').value;
            let email = document.getElementById('email-field').value;
            let pwd = document.getElementById('password-field').value;
            let year = parseInt(document.getElementById('year-field').value);
            if(!isNaN(year)){
                obj.year=year;
            }
            if(phone !== "" && phone !== undefined) obj.phone = phone;
            if(identifier !== "" && identifier !== undefined) obj.username = identifier;
            if(email !== "" && email !== undefined) obj.email = email;
            if(pwd !== "" && pwd !== undefined) obj.pwd = sha256(pwd); 
            console.log(obj)
        }else{
            let identifier = document.getElementById('identifier-field-log').value;
            let pwd = document.getElementById('password-field-log').value;
            if(identifier !== "" && identifier !== undefined) obj.username = identifier;
            if(pwd !== "" && pwd !== undefined) obj.pwd = sha256(pwd); 
        }
        this.props.onSubmit(obj);
        this.setState({ isLoading: true });
    }

    render() {
        return (
            <div className={this.props.className}>
                <form>
                    <h1>{this.props.title}</h1>
                    <span className={"space"}></span>
                    <span className={"error-message"}>{this.props.text}</span>
                    {
                        !this.props.isSignIn ?
                        <Fragment>
                            <input type={"text"} placeholder={"Phone number"} id={"phone-field"} />
                            <input type={"email"} placeholder={"Email"} id={"email-field"} required/>
                            <input type={"username"} placeholder={"Username"} id={"identifier-field"} required/>
                            <input type={"password"} placeholder={"Password"} id={"password-field"} required/>
                            <span className={"space"}></span>
                            <input type={"number"} placeholder={"Number of studied Year after baccalaureate"} id={"year-field"} required/>
                        </Fragment>
                        :
                        <Fragment>
                            <input type={"text"} placeholder={"Username"} id={"identifier-field-log"} required/>
                            <input type={"password"} placeholder={"Password"} id={"password-field-log"} required/>
                        </Fragment>
                    }
                    <span className={"space"}></span>
                    <ThreeDButton text={this.props.buttonText} onSubmit={this.handleSubmit} number={this.props.number}></ThreeDButton>
                </form>
            </div>
        );
    }
}