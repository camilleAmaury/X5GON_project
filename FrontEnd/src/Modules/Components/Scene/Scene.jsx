import React, { Component } from 'react';

import Profile from './Scenes/Profile/Profile';
import Knowledge from './Scenes/Knowledge';
import Scholar from './Scenes/Scholar/Scholar';
import Lectures from './Scenes/Lectures/Lectures';
import Community from './Scenes/Community/Community';

import './Scene.css';

export default class Scene extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = () => {
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
                <Profile isOpen={this.props.sceneOpened[0]} scene={styles.scene} ratio={this.props.ratio} knowledgeSearch={this.knowledgeSearch}></Profile>
                <Knowledge isOpen={this.props.sceneOpened[1]} scene={styles.scene} ratio={this.props.ratio} setSearch={this.props.setSearch} ref={"knowledge"}></Knowledge>
                <Community isOpen={this.props.sceneOpened[2]} scene={styles.scene} ratio={this.props.ratio}></Community>
                <Scholar isOpen={this.props.sceneOpened[3]} scene={styles.scene} ratio={this.props.ratio}></Scholar>
                <Lectures isOpen={this.props.sceneOpened[4]} scene={styles.scene} ratio={this.props.ratio}></Lectures>

            </div>
        );
    }
}