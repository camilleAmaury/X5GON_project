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

export default class ScenePagoda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            floor1: [],
            floor2: [],
            floor3: [],
            floor4: []
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
        floor.style.top = pos.top + pos_floor.top + "px";
        floor.style.left = pos.left + pos_floor.left + "px";
        if (floors === 0) {
            console.log("pas de concepts");
        } else if (floors.length === 1) {
            let floor1 = document.getElementById("scene-floor1");
            let pos1 = getDivPosition(floor1);
            floor1.style.top = pos.top + 265 + "px";
            floor1.style.left = pos.left + pos1.left + "px";
            floor1.style.visibility = "visible";
            this.setState({floor1:floors[0]});
        } else if (floors.length === 2) {
            let floor1 = document.getElementById("scene-floor1");
            let pos1 = getDivPosition(floor1);
            let floor2 = document.getElementById("scene-floor2");
            let pos2 = getDivPosition(floor2);
            floor1.style.top = pos.top + 209 + "px";
            floor1.style.left = pos.left + pos1.left + "px";
            floor2.style.top = pos.top + 342 + "px";
            floor2.style.left = pos.left + pos2.left + "px";
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
            floor1.style.top = pos.top + 147 + "px";
            floor1.style.left = pos.left + pos1.left + "px";
            floor2.style.top = pos.top + 281 + "px";
            floor2.style.left = pos.left + pos2.left + "px";
            floor3.style.top = pos.top + 336 + "px";
            floor3.style.left = pos.left + pos3.left + "px";
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
            floor1.style.top = pos.top + 76 + "px";
            floor1.style.left = pos.left + pos1.left + "px";
            floor2.style.top = pos.top + 209 + "px";
            floor2.style.left = pos.left + pos2.left + "px";
            floor3.style.top = pos.top + 265 + "px";
            floor3.style.left = pos.left + pos3.left + "px";
            floor4.style.top = pos.top + 327 + "px";
            floor4.style.left = pos.left + pos4.left + "px";
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

    render() {
        return (
            <Fragment>
                <img src={PagodaBehind}
                    alt={"scene-pagoda-behind"} id={"scene-pagoda-behind"} style={{ visibility: this.props.visible ? "visible" : "hidden" }} />

                <PagodaPopover id={"scene-floor1"} visible={this.props.visible} src={PagodaFloor1} isOpen={(this.props.visible && !this.props.dismissPopover)}
                    data={this.state.floor1}></PagodaPopover>
                <PagodaPopover id={"scene-floor2"} visible={this.props.visible} src={PagodaFloor2} isOpen={(this.props.visible && !this.props.dismissPopover)}
                    data={this.state.floor2}></PagodaPopover>
                <PagodaPopover id={"scene-floor3"} visible={this.props.visible} src={PagodaFloor3} isOpen={(this.props.visible && !this.props.dismissPopover)}
                    data={this.state.floor3}></PagodaPopover>
                <PagodaPopover id={"scene-floor4"} visible={this.props.visible} src={PagodaFloor4} isOpen={(this.props.visible && !this.props.dismissPopover)}
                    data={this.state.floor4}></PagodaPopover>

                <img src={PagodaFloor} alt={"scene-floor-structure"} id={"scene-floor-structure"} style={{ visibility: this.props.visible ? "visible" : "hidden" }} />
            </Fragment>
        );
    }
}