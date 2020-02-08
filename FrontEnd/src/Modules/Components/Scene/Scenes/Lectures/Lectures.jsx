import React, { Component, Fragment } from 'react';

import Popover from '../../../Popover/Popover';

import './Lectures.css';
import './DocumentContainer.css';
import './PagodaContainer.css';

import axios from "axios";

import leftsideScroll from '../../../../../assets/Panel/Scene/Scholar/scrollSideLeft.png';
import rightsideScroll from '../../../../../assets/Panel/Scene/Scholar/scrollSideRight.png';
import fullPagoda from '../../../../../assets/Panel/Scene/Lectures/fullPagoda.png';
import reverseScroll from '../../../../../assets/Panel/Scene/Lectures/reverseScroll.png';
import table from '../../../../../assets/Panel/Scene/Lectures/table.png';
import encens from '../../../../../assets/Panel/Scene/Lectures/encens.png';
import PagodaFloor from '../../../../../assets/Panel/Scene/Lectures/scenePagodaFloor.png';
import PagodaFloor1 from '../../../../../assets/Panel/Scene/Lectures/scenePagodaFloor1.png';
import PagodaFloor2 from '../../../../../assets/Panel/Scene/Lectures/scenePagodaFloor2.png';
import PagodaFloor3 from '../../../../../assets/Panel/Scene/Lectures/scenePagodaFloor3.png';
import PagodaFloor4 from '../../../../../assets/Panel/Scene/Lectures/scenePagodaFloor4.png';
import PagodaFloor1Hover from '../../../../../assets/Panel/Scene/Lectures/scenePagodaFloor1Hover.png';
import PagodaFloor2Hover from '../../../../../assets/Panel/Scene/Lectures/scenePagodaFloor2Hover.png';
import PagodaFloor3Hover from '../../../../../assets/Panel/Scene/Lectures/scenePagodaFloor3Hover.png';
import PagodaFloor4Hover from '../../../../../assets/Panel/Scene/Lectures/scenePagodaFloor4Hover.png';

import DocumentContainer from './DocumentContainer';
import PreparePosition from './PreparePosition';


export default class Lectures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documents: [],
            documentContainerBox: {
                height: 250,
            },
            documentSeparatorBox: {
                height: 20,
            },
            scrollUpperBox: {
                height: 66,
            },
            scrollUpperTextureBox: {
                height: 74
            },
            scrollSideBox: {
                width: 125,
                height: 83
            },
            sideBox: {
                width: 30,
            },
            beamBox: {
                size: 50
            },
            encensBox: {
                width: 70,
                height: 110
            },
            tableBox: {
                width: 345,
                height: 360
            },
            imageBox: {
                pagoda: {
                    width: 115,
                    height: 200
                },
                scroll: {
                    width: 16,
                    height: 200
                }
            },
            data: [],
            isFloorClicked: [],
            isFloorHovered: [],
            floorPosition: {
                width: 420,
                height: 77
            },
            floorPosition1: {
                width: [321, 348, 390, 444],
                height: [293, 129, 144, 162]
            },
            floorTexture: [{ "base": PagodaFloor1, "hover": PagodaFloor1Hover }, { "base": PagodaFloor2, "hover": PagodaFloor2Hover }, { "base": PagodaFloor3, "hover": PagodaFloor3Hover },
            { "base": PagodaFloor4, "hover": PagodaFloor4Hover }
            ]
        }
    }

    componentDidMount = () => {
        let documentsId = [8160, 8160]
        for (let i = 0; i < documentsId.length; i++) {
            axios.get(`https://platform.x5gon.org/api/v1/oer_materials/${documentsId[i]}/contents/`)
                .then(request => {
                    let doc = {
                        title: "A random title", id: documentsId[i], content: `\n${request.data.oer_contents[0].value.value}\n\n`,
                        isScrolled: false, bgY1: 150, bgY2: 0, corpusTop: 0, isOpened: false, data: []
                    };
                    let arr = this.state.documents.concat([doc]);
                    this.setState({ documents: arr }, () => {
                        // find the prerequisites
                        axios.get(`http://185.157.246.81:5000/prerequisites/${documentsId[i]}`)
                            .then(request => {
                                let prerequisites = [];
                                let datas = request.data;

                                let dataper2 = Math.ceil(datas.length / 2);
                                for (let j = 0; j < dataper2; j++) {
                                    let temp_array = [];
                                    if (j === dataper2 - 1 && datas.length % 2 === 1) {
                                        temp_array.push({ title: datas[2 * j][0], link: datas[2 * j][1] });
                                    } else {
                                        temp_array.push({ title: datas[2 * j][0], link: datas[2 * j][1] });
                                        temp_array.push({ title: datas[2 * j + 1][0], link: datas[2 * j + 1][1] });
                                    }
                                    prerequisites.push(temp_array);
                                }
                                let arr = this.state.documents;
                                arr[i].data = prerequisites;
                                let bool = [];
                                let bool2 = [];
                                for (let j = 0; j < arr[i].data.length; j++) {
                                    bool.push(false);
                                    bool2.push(false)
                                }
                                let floorhovered = this.state.isFloorHovered;
                                let floorcliked = this.state.isFloorClicked;
                                floorhovered.push(bool);
                                floorcliked.push(bool2);
                                this.setState({ documents: arr, isFloorHovered: floorhovered, isFloorClicked:floorcliked }, () => {
                                    let list = document.getElementsByClassName("scrollUpper");
                                    list[i * 2].addEventListener("click", this.scrollDocument);
                                    list[i * 2 + 1].addEventListener("click", this.scrollDocument);
                                });
                            })
                            .catch(error => {
                                console.log(error)
                                console.log("this doesn't work");
                            });
                    });
                })
                .catch(error => {
                    console.log(error)
                    console.log("this doesn't work");
                });
        }
    }

    scrollDocument = event => {
        let documents = this.state.documents;
        let nb = parseInt(event.currentTarget.dataset.key);
        documents[nb].isScrolled = !documents[nb].isScrolled;
        // dom elements
        let list = document.getElementsByClassName("scrollUpper");
        let upper_scroll = list[nb * 2];
        let lower_scroll = list[nb * 2 + 1];
        let lower_scroll_sideLeft = document.getElementsByClassName("scrollSide")[nb * 4 + 2];
        let lower_scroll_sideRight = document.getElementsByClassName("scrollSide")[nb * 4 + 3];
        let lower_texture = lower_scroll.children[0];
        let center_texture = document.getElementsByClassName("scroll-center")[nb];
        let lectures = document.getElementsByClassName("lectures-document")[nb];
        let documentContainer = document.getElementsByClassName("document-container")[nb];
        let documentSeparator = document.getElementsByClassName("document-separator")[nb * 2 + 1];
        let corpus = document.getElementsByClassName("lectures-corpus")[nb];
        // transition
        upper_scroll.removeEventListener('click', this.scrollDocument);
        lower_scroll.removeEventListener('click', this.scrollDocument);
        lower_scroll.style.transition = "1.5s top";
        lower_texture.style.transition = "1.5s background-position-y";
        documentContainer.style.transition = "1.5s height";
        documentSeparator.style.transition = "1.5s top";
        center_texture.style.transition = "1.5s height";
        lectures.style.transition = "1.5s height";
        lower_scroll_sideLeft.style.transition = "1.5s top";
        lower_scroll_sideRight.style.transition = "1.5s top";
        corpus.style.transition = "1.5s height";
        document.getElementsByClassName("side1")[nb].style.transition = "1.5s height";
        document.getElementsByClassName("side2")[nb].style.transition = "1.5s height";
        this.setState({
            documents: documents
        }, () => {
            setTimeout(() => {
                document.getElementById("lectures").scrollTo(0, document.getElementsByClassName("lectures-document")[nb].offsetTop);
                // transition out 
                upper_scroll.addEventListener('click', this.scrollDocument);
                lower_scroll.addEventListener('click', this.scrollDocument);
                lower_scroll.style.transition = "none";
                lower_texture.style.transition = "none";
                documentContainer.style.transition = "none";
                documentSeparator.style.transition = "none";
                center_texture.style.transition = "none";
                lower_scroll_sideLeft.style.transition = "none";
                lower_scroll_sideRight.style.transition = "none";
                lectures.style.transition = "none";
                document.getElementsByClassName("side1")[nb].style.transition = "none";
                document.getElementsByClassName("side2")[nb].style.transition = "none";
                corpus.style.transition = "none";
            }, 1500);
        });
    }

    scrollEv = event => {
        let documents = this.state.documents;
        let nb = parseInt(event.currentTarget.dataset.key);
        // get scrolling speed
        var st = event.currentTarget.scrollTop;
        let speed = 8;
        if (st > documents[nb].corpusTop) {
            speed *= 1;
        } else {
            speed *= -1;
        }

        let size = document.getElementsByClassName("lectures-corpus")[nb].children[0].offsetHeight;
        size -= document.getElementsByClassName("lectures-corpus")[nb].offsetHeight - 20;
        if (st > 0 && Math.sign(speed) === -1) {
            documents[nb].bgY1 += speed;
            documents[nb].bgY2 += speed;
            documents[nb].corpusTop = st;
            this.setState({
                documents: documents
            });
        } else if (st < size && Math.sign(speed) === 1) {
            documents[nb].bgY1 += speed;
            documents[nb].bgY2 += speed;
            documents[nb].corpusTop = st;
            this.setState({
                documents: documents
            });
        }
    }

    changeScene = event => {
        let documents = this.state.documents;
        let nb = parseInt(event.currentTarget.dataset.key);
        documents[nb].isOpened = !documents[nb].isOpened;
        let list = document.getElementsByClassName("scrollUpper");
        let upper_scroll = list[nb * 2];
        let lower_scroll = list[nb * 2 + 1];
        let lower_scroll_sideLeft = document.getElementsByClassName("scrollSide")[nb * 4 + 2];
        let lower_scroll_sideRight = document.getElementsByClassName("scrollSide")[nb * 4 + 3];
        let documentContainer = document.getElementsByClassName("document-container")[nb];
        let pagodaContainer = document.getElementsByClassName("pagoda-container")[nb];
        let separatorContainer = document.getElementsByClassName("document-separator")[nb * 2];
        let corpus = document.getElementsByClassName("lectures-corpus")[nb];
        // transition
        upper_scroll.removeEventListener('click', this.scrollDocument);
        lower_scroll.removeEventListener('click', this.scrollDocument);
        lower_scroll.style.transition = "1.5s left";
        documentContainer.style.transition = "1.5s left";
        lower_scroll_sideLeft.style.transition = "1.5s left";
        lower_scroll_sideRight.style.transition = "1.5s left";
        pagodaContainer.style.transition = "1.5s left";
        separatorContainer.style.transition = "1.5s left";
        corpus.style.transition = "1.5s left";
        document.getElementsByClassName("side1")[nb].style.transition = "1.5s left";
        document.getElementsByClassName("side2")[nb].style.transition = "1.5s left";
        this.setState({
            documents: documents
        }, () => {
            setTimeout(() => {
                document.getElementById("lectures").scrollTo(0, document.getElementsByClassName("document-container")[nb].offsetTop);
                // transition out 
                upper_scroll.addEventListener('click', this.scrollDocument);
                lower_scroll.addEventListener('click', this.scrollDocument);
                lower_scroll.style.transition = "none";
                documentContainer.style.transition = "none";
                lower_scroll_sideLeft.style.transition = "none";
                lower_scroll_sideRight.style.transition = "none";
                pagodaContainer.style.transition = "none";
                separatorContainer.style.transition = "none";
                document.getElementsByClassName("side1")[nb].style.transition = "none";
                document.getElementsByClassName("side2")[nb].style.transition = "none";
                corpus.style.transition = "none";
            }, 1500);
        });
    }

    hoverPagoda = (i, j) => {
        let floor = this.state.isFloorHovered;
        floor[i][j] = true;
        this.setState({
            isFloorHovered: floor
        });
    }

    unhoverPagoda = (i, j) => {
        let floor = this.state.isFloorHovered;
        floor[i][j] = false;
        this.setState({
            isFloorHovered: floor
        });
    }

    clickPagoda = (i, j) => {
        let floor = this.state.isFloorClicked;
        floor[i][j] = !floor[i][j];
        this.setState({
            isFloorClicked: floor
        });
    }


    render() {
        let styles = PreparePosition(this.state.documents, this.props.ratio, this.props.scene, this.state);
        return (
            <div id={"lectures"} style={
                {
                    visibility: this.props.isOpen ? "visible" : "hidden"
                }
            }>
                {this.state.documents.map((item, i) =>
                    <div className={"lectures-document"} key={i} data-id={item.id} style={
                        {
                            height: styles.lecturesDocument.height[i]
                        }
                    }>
                        {DocumentContainer(item, i, styles, this.changeScene, this.scrollEv, leftsideScroll, rightsideScroll, fullPagoda)}

                        <div className={"document-separator"} style={
                            {
                                height: styles.container.separator.height[i],
                                width: styles.container.separator.width,
                                left: styles.container.separator.left[i]
                            }
                        }></div>

                        <div className={"pagoda-container"} data-id={item.id} style={
                            {
                                height: styles.container.pagoda.height[i],
                                width: styles.container.pagoda.width,
                                left: styles.container.pagoda.left[i]
                            }
                        }>
                            {/* beam */}
                            <div className={"verticalBeam"} style={
                                {
                                    left: styles.beamVertical.left1[i],
                                    width: styles.beamVertical.width,
                                    height: styles.beamVertical.height[i],
                                }
                            }></div>
                            <div className={"verticalBeam"} style={
                                {
                                    left: styles.beamVertical.left2[i],
                                    width: styles.beamVertical.width,
                                    height: styles.beamVertical.height[i],
                                }
                            }></div>
                            <div className={"horizontalBeam"} style={
                                {
                                    left: styles.beamHorizontal.left1[i],
                                    width: styles.beamHorizontal.width1[i],
                                    height: styles.beamHorizontal.height,
                                    top: styles.beamHorizontal.top1[i],
                                }
                            }></div>
                            <div className={"horizontalBeam"} style={
                                {
                                    left: styles.beamHorizontal.left3[i],
                                    width: styles.beamHorizontal.width1[i],
                                    height: styles.beamHorizontal.height,
                                    top: styles.beamHorizontal.top1[i],
                                }
                            }></div>
                            <div className={"horizontalBeam"} style={
                                {
                                    left: styles.beamHorizontal.left2[i],
                                    width: styles.beamHorizontal.width2[i],
                                    height: styles.beamHorizontal.height,
                                    top: styles.beamHorizontal.top2[i],
                                }
                            }></div>

                            {/* details */}
                            <img className={"table"} alt={"table-pagoda"} src={table} style={
                                {
                                    left: styles.table.left,
                                    width: styles.table.width,
                                    height: styles.table.height,
                                    top: styles.table.top[i],
                                }
                            }></img>

                            <img className={"encens"} alt={"encens-pagoda"} src={encens} style={
                                {
                                    left: styles.encens.left,
                                    width: styles.encens.width,
                                    height: styles.encens.height,
                                    top: styles.encens.top[i],
                                }
                            }></img>


                            {/* pagoda */}
                            {this.state.documents[i].data.map((item, j) =>
                                <Fragment key={j}>
                                    <img className={"pagoda"} alt={"pagoda-floor"}
                                        src={this.state.isFloorHovered[i][j] ? this.state.floorTexture[j].hover : this.state.floorTexture[j].base}
                                        onMouseEnter={() => { this.hoverPagoda(i, j) }} onMouseLeave={() => { this.unhoverPagoda(i, j) }} 
                                        onClick={() => { this.clickPagoda(i, j) }} style={
                                            {
                                                top: styles.pagodaDocument[i].top[j],
                                                height: styles.pagodaDocument[i].height[j],
                                                width: styles.pagodaDocument[i].width[j],
                                                left: styles.pagodaDocument[i].left[j],
                                            }
                                    }></img>
                                    <Popover className={"pagoda-hover"} 
                                        target={{top: styles.pagodaDocument[i].top[j],height: styles.pagodaDocument[i].height[j],width: styles.pagodaDocument[i].width[j],left: styles.pagodaDocument[i].left[j]}} 
                                        ratio={1 / 2} side={"left"} size={{ width: 250, height: 100 }}
                                        isOpen={this.state.isFloorHovered[i][j] && !this.state.isFloorClicked[i][j]} title={"Pagoda"}>
                                        <div className={"body"}>
                                            Click here to see more !
                                        </div>
                                    </Popover>
                                    <Popover className={"pagoda-click"} 
                                        target={{top: styles.pagodaDocument[i].top[j],height: styles.pagodaDocument[i].height[j],width: styles.pagodaDocument[i].width[j],left: styles.pagodaDocument[i].left[j]}} 
                                        ratio={1 / 2} side={"left"} size={{ width: 450, height: 125 }}
                                        isOpen={this.state.isFloorClicked[i][j]} title={item[0].title}>
                                        <div className={"body"}>
                                            <div className={"librarian-answering-item"} key={i} data-key={item.id}>
                                                <div className={"librarian-answering-item-number"}><span>{i}</span></div>
                                                <div className={"librarian-answering-item-info"}>
                                                    <span className={"librarian-answering-item-info-title"}>{item[0].link}</span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </Popover>
                                    <Popover className={"pagoda-click"} 
                                        target={{top: styles.pagodaDocument[i].top[j],height: styles.pagodaDocument[i].height[j],width: styles.pagodaDocument[i].width[j],left: styles.pagodaDocument[i].left[j]}} 
                                        ratio={1 / 2} side={"right"} size={{ width: 450, height: 125 }}
                                        isOpen={this.state.isFloorClicked[i][j]} title={item[0].title}>
                                        <div className={"body"}>
                                            <div className={"librarian-answering-item"} key={i} data-key={item.id}>
                                                <div className={"librarian-answering-item-number"}><span>{i}</span></div>
                                                <div className={"librarian-answering-item-info"}>
                                                    <span className={"librarian-answering-item-info-title"}>{item[0].link}</span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </Popover>
                                </Fragment>
                            )}

                            <img className={"floor"} alt={"floor-pagoda"} src={PagodaFloor} style={
                                {
                                    left: styles.pagodafloor.left,
                                    width: styles.pagodafloor.width,
                                    height: styles.pagodafloor.height,
                                    top: styles.pagodafloor.top[i],
                                }
                            }></img>

                            {/* Changing button */}
                            <div className={"changeButton-two"} data-key={i} onClick={item.isScrolled ? this.changeScene : () => { }} style={
                                {
                                    top: styles.button2.top[i],
                                    width: styles.button2.width,
                                    height: styles.button2.height,
                                }
                            }>
                                <img className={"img"} alt={"scroll-button"} src={reverseScroll} style={
                                    {
                                        left: styles.image2[i].left,
                                        top: styles.image2[i].top,
                                        width: styles.image2[i].width,
                                        height: styles.image2[i].height,
                                    }
                                }></img>
                            </div>
                        </div>

                        <div className={"document-separator"} style={
                            {
                                height: this.state.documentSeparatorBox.height,
                                top: styles.lecturesDocument.height[i] - this.state.documentSeparatorBox.height,
                            }
                        }></div>

                    </div>
                )}

            </div>
        );
    }
}