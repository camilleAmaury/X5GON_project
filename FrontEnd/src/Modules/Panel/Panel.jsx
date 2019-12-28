import React, { Component } from 'react';

import './Panel.scss';
import title from '../../assets/Title.png'

export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = () => {
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    render() {
        return (
            <div id={"container-panel"}>
                <div className={"space-container"}></div>
                <div className={"presentation-container"}>
                    <img src={title} alt={"Title"} className={"presentation-title"} />
                </div>
                <div className={"space-container"}></div>
                <div className={"panel-container"}>
                    <div className={"space-panel-container"}></div>
                    <div className={"left-panel-container"}>
                        <div className={"side-panel-container-title"}>Actions</div>
                        <div className={"side-panel-container-list-container left-list-container"}>
                            <div className={"side-panel-container-list-item left-list-item"}>
                                <div className={"list-item-text-container left-list-text-item"}>Find a knowledge</div>
                                <div className={"list-item-logo-container"}></div>
                            </div>
                            <div className={"side-panel-container-list-item left-list-item"}>
                                <div className={"list-item-text-container left-list-text-item"}>Ask the scholar</div>
                                <div className={"list-item-logo-container"}></div>
                            </div>
                        </div>
                    </div>
                    <div className={"center-panel-container"}></div>
                    <div className={"right-panel-container"}>
                        <div className={"side-panel-container-title"}>Apprentice's Information</div>
                        <div className={"side-panel-container-list-container right-list-container"}>
                            <div className={"side-panel-container-list-item right-list-item"}>
                                <div className={"list-item-logo-container"}></div>
                                <div className={"list-item-text-container right-list-text-item"}>Rank</div>
                            </div>
                            <div className={"side-panel-container-list-item right-list-item"}>
                                <div className={"list-item-logo-container"}></div>
                                <div className={"list-item-text-container right-list-text-item"}>Apprentice Papers</div>
                            </div>
                        </div>
                    </div>
                    <div className={"space-panel-container"}></div>
                </div>
            </div>
        );
    }
}