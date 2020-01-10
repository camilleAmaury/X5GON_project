import React, { Component, Fragment } from 'react';

import './ScenePagoda.scss';

import axios from "axios";

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
            floorPosition:{
                top:388,
                left:332,
                width:187,
                height:34
            },
            floor1Position:{
                top:0,
                left:354,
                width:143,
                height:130
            },
            floor2Position:{
                top:0,
                left:348,
                width:155,
                height:57
            },
            floor3Position:{
                top:0,
                left:339,
                width:173,
                height:64
            },
            floor4Position:{
                top:0,
                left:327,
                width:197,
                height:72
            },
            isFloorVisible:[false, false, false, false]
        }
    }

    componentDidMount = () => {
        let documentId = 39642;
        axios.get(`https://platform.x5gon.org/api/v1/oer_materials/${documentId}/contents/`)
        .then( request => {
            let content = request.data;
            console.log(content);
        })
        .catch( error => { 
            console.log("this doesn't work");
        });
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
        let top1, top2, top3, top4 = 0;
        let content1, content2, content3, content4 = [];
        let floorVisible = [false, false, false, false];
        if (data.length === 0) {
            console.log("pas de concepts");
        } else if (data.length === 1) {
            top1 = 265;
            content1 = data[0];
            floorVisible=[true, false, false, false];
        } else if (data.length === 2) {
            top1 = 209;
            top2 = 342;
            content1 = data[0]; content2 = data[1];
            floorVisible=[true, true, false, false];
        } else if (data.length === 3) {
            top1 = 147;
            top2 = 281;
            top3 = 336;
            content1 = data[0]; content2 = data[1]; content3 = data[2];
            floorVisible=[true, true, true, false];
        } else if (data.length === 4) {
            top1 = 79;
            top2 = 209;
            top3 = 265;
            top4 = 327;
            content1 = data[0]; content2 = data[1]; content3 = data[2]; content4 = data[3];
            floorVisible=[true, true, true, true];
        } else {
            console.log("plus de 8 concepts --> non viable");
        }
        this.setState({
            floor1Position:{
                top:top1,
                left:354,
                width:143,
                height:130
            },
            floor2Position:{
                top:top2,
                left:348,
                width:155,
                height:57
            },
            floor3Position:{
                top:top3,
                left:339,
                width:173,
                height:64
            },
            floor4Position:{
                top:top4,
                left:327,
                width:197,
                height:72
            },
            isFloorVisible:floorVisible,
            floor1:content1, floor2:content2,floor3:content3, floor4:content4
        });
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
        let sceneWidth = Math.floor(this.props.innerScenePosition.width * this.props.ratio);
        let sceneHeight = Math.floor(this.props.innerScenePosition.height * this.props.ratio);
        let floorPosition = {
            top:Math.floor(this.state.floorPosition.top*this.props.ratio),
            left:Math.floor(this.state.floorPosition.left*this.props.ratio),
            width:Math.floor(this.state.floorPosition.width*this.props.ratio),
            height:Math.floor(this.state.floorPosition.height*this.props.ratio)
        };
        let floor1Position = {
            top:Math.floor(this.state.floor1Position.top*this.props.ratio),
            left:Math.floor(this.state.floor1Position.left*this.props.ratio),
            width:Math.floor(this.state.floor1Position.width*this.props.ratio),
            height:Math.floor(this.state.floor1Position.height*this.props.ratio)
        };
        let floor2Position = {
            top:Math.floor(this.state.floor2Position.top*this.props.ratio),
            left:Math.floor(this.state.floor2Position.left*this.props.ratio),
            width:Math.floor(this.state.floor2Position.width*this.props.ratio),
            height:Math.floor(this.state.floor2Position.height*this.props.ratio)
        };
        let floor3Position = {
            top:Math.floor(this.state.floor3Position.top*this.props.ratio),
            left:Math.floor(this.state.floor3Position.left*this.props.ratio),
            width:Math.floor(this.state.floor3Position.width*this.props.ratio),
            height:Math.floor(this.state.floor3Position.height*this.props.ratio)
        };
        let floor4Position = {
            top:Math.floor(this.state.floor4Position.top*this.props.ratio),
            left:Math.floor(this.state.floor4Position.left*this.props.ratio),
            width:Math.floor(this.state.floor4Position.width*this.props.ratio),
            height:Math.floor(this.state.floor4Position.height*this.props.ratio)
        };
        return (
            <Fragment>
                <img src={PagodaBehind} alt={"scene-pagoda-behind"} id={"scene-pagoda-behind"} 
                    style={
                        { 
                            visibility: this.props.visible ? "visible" : "hidden",
                            height:sceneHeight,
                            width:sceneWidth
                        }
                    } />

                <PagodaPopover id={"scene-floor1"} visible={this.props.visible} src={PagodaFloor1} srcHover={PagodaFloor1Hover} isOpen={(this.props.visible && !this.props.dismissPopover)}
                    data={this.state.floor1} clickHandle={this.isFloorClicked} openFloor={this.state.isFloorClicked[0]} datakey={0}
                    hoverHandle={this.isFloorHovered} hoverFloor={this.state.isFloorHovered[0]} position={floor1Position} isVisible={this.state.isFloorVisible[0]}></PagodaPopover>

                <PagodaPopover id={"scene-floor2"} visible={this.props.visible} src={PagodaFloor2} srcHover={PagodaFloor2Hover} isOpen={(this.props.visible && !this.props.dismissPopover)}
                    data={this.state.floor2} clickHandle={this.isFloorClicked} openFloor={this.state.isFloorClicked[1]} datakey={1}
                    hoverHandle={this.isFloorHovered} hoverFloor={this.state.isFloorHovered[1]} position={floor2Position} isVisible={this.state.isFloorVisible[1]}></PagodaPopover>

                <PagodaPopover id={"scene-floor3"} visible={this.props.visible} src={PagodaFloor3} srcHover={PagodaFloor3Hover} isOpen={(this.props.visible && !this.props.dismissPopover)}
                    data={this.state.floor3} clickHandle={this.isFloorClicked} openFloor={this.state.isFloorClicked[2]} datakey={2}
                    hoverHandle={this.isFloorHovered} hoverFloor={this.state.isFloorHovered[2]} position={floor3Position} isVisible={this.state.isFloorVisible[2]}></PagodaPopover>

                <PagodaPopover id={"scene-floor4"} visible={this.props.visible} src={PagodaFloor4} srcHover={PagodaFloor4Hover} isOpen={(this.props.visible && !this.props.dismissPopover)}
                    data={this.state.floor4} clickHandle={this.isFloorClicked} openFloor={this.state.isFloorClicked[3]} datakey={3}
                    hoverHandle={this.isFloorHovered} hoverFloor={this.state.isFloorHovered[3]} position={floor4Position} isVisible={this.state.isFloorVisible[3]}></PagodaPopover>

                <img src={PagodaFloor} alt={"scene-floor-structure"} id={"scene-floor-structure"}
                    style={
                        { 
                            visibility: this.props.visible ? "visible" : "hidden",
                            height:floorPosition.height,
                            width:floorPosition.width,
                            top:floorPosition.top,
                            left:floorPosition.left
                        }
                    } />
            </Fragment>
        );
    }
}