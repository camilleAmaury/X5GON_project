import React, { Component, Fragment } from 'react';

import './ScenePagoda.scss';

import getDivPosition from '../../../Functions/Position/DivPosition';
import PagodaPopover from './PagodaPopover';

import PagodaBehind from '../../../assets/Scene/knowledge/Pagoda/scenePagodaBehind.png';
import PagodaFloor from '../../../assets/Scene/knowledge/Pagoda/scenePagodaFloor.png';
import PagodaFloor1 from '../../../assets/Scene/knowledge/Pagoda/scenePagodaFloor1.png';
import PagodaFloor2 from '../../../assets/Scene/knowledge/Pagoda/scenePagodaFloor2.png';
import PagodaFloor3 from '../../../assets/Scene/knowledge/Pagoda/scenePagodaFloor3.png';
import PagodaFloor4 from '../../../assets/Scene/knowledge/Pagoda/scenePagodaFloor4.png';
import PagodaFloor1Hover from '../../../assets/Scene/knowledge/Pagoda/scenePagodaFloor1Hover.png';
import PagodaFloor2Hover from '../../../assets/Scene/knowledge/Pagoda/scenePagodaFloor2Hover.png';
import PagodaFloor3Hover from '../../../assets/Scene/knowledge/Pagoda/scenePagodaFloor3Hover.png';
import PagodaFloor4Hover from '../../../assets/Scene/knowledge/Pagoda/scenePagodaFloor4Hover.png';

export default class ScenePagoda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            floor1: [],
            floor2: [],
            floor3: [],
            floor4: [],
            isFloorClicked:[false, false, false, false],
            isFloorHovered:[false, false, false, false],
        }
    }

    componentDidMount = () => {
        // fecth data from server with an id
        let data = [
            [
                {
                    "title":"Tableau", 
                    documents: [
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                    ]
                },
                {
                    "title":"LinkedList", 
                    documents: [
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                    ]
                },
            ],
            [
                {
                    "title":"Structure de données", 
                    documents: [
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                    ]
                }
            ],
            [
                {
                    "title":"Tableau", 
                    documents: [
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                    ]
                },
                {
                    "title":"LinkedList", 
                    documents: [
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                    ]
                },
            ],
            [
                {
                    "title":"Structure de données", 
                    documents: [
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                        {title:"Random book", author:"Random Author", keywords:["random"]},
                    ]
                }
            ]
        ];
        // draw the pagoda
        let floors = data;
        let scene = document.getElementById("scene");
        let pos = getDivPosition(scene);
        let floor = document.getElementById("scene-floor-structure");
        let pos_floor = getDivPosition(floor);
        floor.style.top = pos_floor.top - pos.top + "px";
        floor.style.left = pos_floor.left - pos.left + "px";
        if (floors === 0) {
            console.log("pas de concepts");
        } else if (floors.length === 1) {
            let floor1 = document.getElementById("scene-floor1");
            let pos1 = getDivPosition(floor1);
            floor1.style.top = 265 + "px";
            floor1.style.left = pos1.left - pos.left + "px";
            floor1.style.visibility = "visible";
            this.setState({floor1:floors[0]});
        } else if (floors.length === 2) {
            let floor1 = document.getElementById("scene-floor1");
            let pos1 = getDivPosition(floor1);
            let floor2 = document.getElementById("scene-floor2");
            let pos2 = getDivPosition(floor2);
            floor1.style.top = 209 + "px";
            floor1.style.left = pos1.left - pos.left + "px";
            floor2.style.top = 342 + "px";
            floor2.style.left = pos2.left - pos.left + "px";
            floor1.style.visibility = "visible";
            floor2.style.visibility = "visible";
            this.setState({floor1:floors[0],floor2:floors[1]});
        } else if (floors.length === 3) {
            let floor1 = document.getElementById("scene-floor1");
            let pos1 = getDivPosition(floor1);
            let floor2 = document.getElementById("scene-floor2");
            let pos2 = getDivPosition(floor2);
            let floor3 = document.getElementById("scene-floor3");
            let pos3 = getDivPosition(floor3);
            floor1.style.top = 147 + "px";
            floor1.style.left = pos1.left - pos.left + "px";
            floor2.style.top = 281 + "px";
            floor2.style.left = pos2.left - pos.left + "px";
            floor3.style.top = 336 + "px";
            floor3.style.left = pos3.left - pos.left + "px";
            floor1.style.visibility = "visible";
            floor2.style.visibility = "visible";
            floor3.style.visibility = "visible";
            this.setState({floor1:floors[0],floor2:floors[1],floor3:floors[2]});
        } else if (floors.length === 4) {
            let floor1 = document.getElementById("scene-floor1");
            let pos1 = getDivPosition(floor1);
            let floor2 = document.getElementById("scene-floor2");
            let pos2 = getDivPosition(floor2);
            let floor3 = document.getElementById("scene-floor3");
            let pos3 = getDivPosition(floor3);
            let floor4 = document.getElementById("scene-floor4");
            let pos4 = getDivPosition(floor4);
            floor1.style.top =  79 + "px";
            floor1.style.left = pos1.left - pos.left + "px";
            floor2.style.top =  209 + "px";
            floor2.style.left = pos2.left - pos.left + "px";
            floor3.style.top =  265 + "px";
            floor3.style.left = pos3.left - pos.left + "px";
            floor4.style.top =  327 + "px";
            floor4.style.left = pos4.left - pos.left + "px";
            floor1.style.visibility = "visible";
            floor2.style.visibility = "visible";
            floor3.style.visibility = "visible";
            floor4.style.visibility = "visible";
            this.setState({floor1:floors[0],floor2:floors[1],floor3:floors[2],floor4:floors[3]});
        } else {
            console.log("plus de 8 concepts --> non viable");
        }
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    isFloorClicked = (id) => {
        let floorclicked = this.state.isFloorClicked;
        let clicked = floorclicked[id] ? false : true;
        floorclicked = [false, false, false, false];
        floorclicked[id] = clicked;
        this.setState({isFloorClicked:floorclicked});
    }

    isFloorHovered = (id) => {
        let floorhovered = this.state.isFloorHovered;
        let hovered = floorhovered[id] ? false : true;
        floorhovered = [false, false, false, false];
        floorhovered[id] = hovered;
        this.setState({ isFloorHovered: floorhovered });
    }

    render() {
        return (
            <Fragment>
                <img src={PagodaBehind}
                    alt={"scene-pagoda-behind"} id={"scene-pagoda-behind"} style={{ visibility: this.props.visible ? "visible" : "hidden" }} />
                <PagodaPopover id={"scene-floor1"} visible={this.props.visible} src={PagodaFloor1} srcHover={PagodaFloor1Hover} isOpen={(this.props.visible && !this.props.dismissPopover)}
                    data={this.state.floor1} clickHandle={this.isFloorClicked} openFloor={this.state.isFloorClicked[0]} datakey={0}
                    hoverHandle={this.isFloorHovered} hoverFloor={this.state.isFloorHovered[0]}></PagodaPopover>
                <PagodaPopover id={"scene-floor2"} visible={this.props.visible} src={PagodaFloor2} srcHover={PagodaFloor2Hover} isOpen={(this.props.visible && !this.props.dismissPopover)}
                    data={this.state.floor2} clickHandle={this.isFloorClicked} openFloor={this.state.isFloorClicked[1]} datakey={1}
                    hoverHandle={this.isFloorHovered} hoverFloor={this.state.isFloorHovered[1]}></PagodaPopover>
                <PagodaPopover id={"scene-floor3"} visible={this.props.visible} src={PagodaFloor3} srcHover={PagodaFloor3Hover} isOpen={(this.props.visible && !this.props.dismissPopover)}
                    data={this.state.floor3} clickHandle={this.isFloorClicked} openFloor={this.state.isFloorClicked[2]} datakey={2}
                    hoverHandle={this.isFloorHovered} hoverFloor={this.state.isFloorHovered[2]}></PagodaPopover>
                <PagodaPopover id={"scene-floor4"} visible={this.props.visible} src={PagodaFloor4} srcHover={PagodaFloor4Hover} isOpen={(this.props.visible && !this.props.dismissPopover)}
                    data={this.state.floor4} clickHandle={this.isFloorClicked} openFloor={this.state.isFloorClicked[3]} datakey={3}
                    hoverHandle={this.isFloorHovered} hoverFloor={this.state.isFloorHovered[3]}></PagodaPopover>
                <img src={PagodaFloor} alt={"scene-floor-structure"} id={"scene-floor-structure"} style={{ visibility: this.props.visible ? "visible" : "hidden" }} />
            </Fragment>
        );
    }
}