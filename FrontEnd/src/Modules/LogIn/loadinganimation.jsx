import React, { Component } from 'react';

import loading from '../../assets/loadinganimation5.gif';

export default class LoadingAnimation extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount = () =>{
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    render() {
        return (
            this.props.isLoading ? <img src={loading} style={{"width":this.props.size[0], "height":this.props.size[1]}} alt="loading"/>: this.props.else
        );
    }
}