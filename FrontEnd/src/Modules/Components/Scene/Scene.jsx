import React, { Component, Fragment } from 'react';

import Profile from './Scenes/Profile/Profile';
import Knowledge from './Scenes/Knowledge';
import Scholar from './Scenes/Scholar/Scholar';
import Lectures from './Scenes/Lectures/Lectures';
import Community from './Scenes/Community/Community';

import './Scene.css';
import Confidentiality from './Scenes/Confidentiality';

export default class Scene extends Component {
    _isMounted=true;
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = () => {
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    preparePositions = () => {
        let obj = {};
        // floor
        obj.scene = {
            width: this.props.style.width,
            height: this.props.style.height,
            left: this.props.style.left,
            top: this.props.style.top,
        };
        return obj;
    }

    knowledgeSearch = (value) => {
        this.props.clickIcon(1);
        try{
            this.refs.knowledge.askQuestion(value)
        }catch(error){
            console.log("Refs error");
        }
    }

    render() {
        let styles = this.preparePositions();
        return (
            <div id={"scene"} style={
                {
                    top: styles.scene.top,
                    width: styles.scene.width,
                    height: styles.scene.height,
                    left:styles.scene.left
                }
            }>

                {this._isMounted ?
                <Fragment>
                    {this.props.sceneOpened[0] ? <Profile isOpen={this.props.sceneOpened[0]} scene={styles.scene} ratio={this.props.ratio} knowledgeSearch={this.knowledgeSearch}></Profile> : ""}
                    <Knowledge isOpen={this.props.sceneOpened[1]} clickIcon={this.props.clickIcon} scene={styles.scene} ratio={this.props.ratio} setSearch={this.props.setSearch} ref={"knowledge"}></Knowledge>
                    {this.props.sceneOpened[2] ? <Community isOpen={this.props.sceneOpened[2]} scene={styles.scene} ratio={this.props.ratio}></Community> : "" }
                    {this.props.sceneOpened[3] ? <Scholar isOpen={this.props.sceneOpened[3]} scene={styles.scene} ratio={this.props.ratio}></Scholar> : ""}
                    {this.props.sceneOpened[4] ? <Lectures isOpen={this.props.sceneOpened[4]} scene={styles.scene} ratio={this.props.ratio}></Lectures> : ""}
                    {this.props.sceneOpened[5] ? <Confidentiality isOpen={this.props.sceneOpened[5]} scene={styles.scene} ratio={this.props.ratio}></Confidentiality> : ""}  
                </Fragment>
                : ""}
            </div>
        );
    }
}