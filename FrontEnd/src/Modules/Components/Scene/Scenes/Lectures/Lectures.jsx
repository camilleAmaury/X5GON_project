import React, { Component } from 'react';

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
import PagodaContainer from './PagodaContainer';


export default class Lectures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documents: [],
            valdelBox: {
                size: 50
            },
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
            isFloorClicked: [],
            isFloorHovered: [],
            isValidateHovered: [],
            isDeleteHovered: [],
            isDeleteClicked: [],
            floorPosition: {
                width: 315,
                height: 58
            },
            floorPosition1: {
                width: [241, 261, 293, 333],
                height: [220, 97, 108, 122]
            },
            floorTexture: [
                { "base": PagodaFloor1, "hover": PagodaFloor1Hover },
                { "base": PagodaFloor2, "hover": PagodaFloor2Hover },
                { "base": PagodaFloor3, "hover": PagodaFloor3Hover },
                { "base": PagodaFloor4, "hover": PagodaFloor4Hover }
            ],
            server: "",
            server2: "",
            config: {}
        }
    }

    componentDidMount = () => {
        let server = (process.env.REACT_APP_DEV === "1" ? process.env.REACT_APP_SERVER_DEV : process.env.REACT_APP_SERVER);
        let server2 = process.env.REACT_APP_SERVER2;
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        this.setState({ server: server, config: config, server2: server2 }, () => {
            this._loadDocument();
        });
    }

    _loadDocument = () => {
        axios.get(`${this.state.server}users/${JSON.parse(localStorage.getItem("isConnected")).id}/opened_documents?isValidated=True`)
            .then(request => {
                let documentsId = [];
                for (let i = 0; i < request.data.length; i++) {
                    documentsId.push({ id: request.data[i].graph_ref, title: request.data[i].document_title, isRated: request.data[i].isValidated});
                }
                let documents = [];
                for (let i = 0; i < documentsId.length; i++) {
                    axios.get(`${this.state.server2}api/v1/oer_materials/${documentsId[i].id}/contents/`)
                        .then(request1 => {
                            if (this.props.isMounted) {
                                // find the prerequisites
                                axios.get(`http://185.157.246.81:5000/prerequisites/${documentsId[i].id}`)
                                    .then(request2 => {
                                        let prerequisites = [];
                                        let datas = request2.data;
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
                                        let doc = {
                                            title: documentsId[i].title, id: documentsId[i].id, content: `\n${request1.data.oer_contents[0].value.value}\n\n`, isTitleHover:false,
                                            isScrolled: false, bgY1: 150, bgY2: 0, corpusTop: 0, isOpened: false, data: [], isDeleteHovered: false, isDeleteClicked: 0, isValidateHovered: false,
                                            isValidateClicked: false, ratingUnderstanding: 0, ratingQuality: 0, ratingUnderstandingHover: 0, ratingQualityHover: 0, isRated: documentsId[i].isRated
                                        };
                                        doc.data = prerequisites;
                                        let bool = [];
                                        let bool2 = [];
                                        for (let j = 0; j < doc.data.length; j++) {
                                            bool.push(false);
                                            bool2.push(false);
                                        }
                                        let floorhovered = this.state.isFloorHovered;
                                        let floorcliked = this.state.isFloorClicked;
                                        floorhovered.push(bool);
                                        floorcliked.push(bool2);
                                        if (this.props.isMounted) {
                                            let ind = documents.push(doc) - 1;
                                            this.setState({ documents: documents, isFloorHovered: floorhovered, isFloorClicked: floorcliked }, () => {
                                                try {
                                                    setTimeout(() => {
                                                        let list = document.getElementsByClassName("scrollUpper");
                                                        list[ind * 2].addEventListener("click", this.scrollDocument);
                                                        list[ind * 2 + 1].addEventListener("click", this.scrollDocument);
                                                    }, 500);
                                                } catch (error) {
                                                    // console.log(error);
                                                }
                                            });
                                        }
                                    })
                                    .catch(error => {
                                        // console.log(error)
                                        console.log("Can't load prerequisites");
                                    });
                            }
                        })
                        .catch(error => {
                            // console.log(error)
                            console.log("Can't load document");
                        });
                }
            })
            .catch(error => {
                console.log("pd")
            });
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
        let btn1 = document.getElementsByClassName("changeButton")[nb];
        let btn2 = document.getElementsByClassName("changeButton-two")[nb];
        let btnVal = document.getElementsByClassName("validateButton")[nb];
        let btnDel = document.getElementsByClassName("deleteButton")[nb];
        let popDel = document.getElementById("popover-delete-hover2-" + nb);
        let poptitle = document.getElementById("popover-title-hover-" + nb);
        // transition
        if (!documents[nb].isScrolled) {
            btn1.removeEventListener('click', this.changeScene);
            btn2.removeEventListener('click', this.changeScene);
        }
        upper_scroll.removeEventListener('click', () => documents[nb].isScrolled ? this.changeScene : () => {});
        lower_scroll.removeEventListener('click', () => documents[nb].isScrolled ? this.changeScene : () => {});
        lower_scroll.style.transition = "1.5s top";
        lower_texture.style.transition = "1.5s background-position-y";
        documentContainer.style.transition = "1.5s height";
        documentSeparator.style.transition = "1.5s top";
        center_texture.style.transition = "1.5s height";
        lectures.style.transition = "1.5s height";
        lower_scroll_sideLeft.style.transition = "1.5s top";
        lower_scroll_sideRight.style.transition = "1.5s top";
        btnVal.style.transition = "1.5s top";
        btnDel.style.transition = "1.5s top";
        popDel.style.transition = "1.5s top";
        corpus.style.transition = "1.5s height";
        poptitle.style.transition = "1.5s top";
        document.getElementsByClassName("side1")[nb].style.transition = "1.5s height";
        document.getElementsByClassName("side2")[nb].style.transition = "1.5s height";
        if (this.props.isMounted) {
            this.setState({
                documents: documents
            }, () => {
                setTimeout(() => {
                    document.getElementById("lectures").scrollTo(0, document.getElementsByClassName("lectures-document")[nb].offsetTop);
                    // transition out 
                    if (documents[nb].isScrolled) {
                        btn1.addEventListener('click', () => documents[nb].isScrolled ? this.changeScene : () => {});
                        btn2.addEventListener('click', () => documents[nb].isScrolled ? this.changeScene : () => {});
                    }
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
                    btnVal.style.transition = "none";
                    btnDel.style.transition = "none";
                    popDel.style.transition = "none";
                    poptitle.style.transition = "none";
                    document.getElementsByClassName("side1")[nb].style.transition = "none";
                    document.getElementsByClassName("side2")[nb].style.transition = "none";
                    corpus.style.transition = "none";
                }, 1500);
            });
        }
    }

    scrollEv = event => {
        let documents = this.state.documents;
        let nb = parseInt(event.currentTarget.dataset.key);
        // get scrolling speed
        var st = event.currentTarget.children[0].scrollTop;
        let speed = 8;
        if (st > documents[nb].corpusTop) {
            speed *= 1;
        } else {
            speed *= -1;
        }

        let size = document.getElementsByClassName("lectures-corpus")[nb].children[0].scrollHeight;
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
        let btn1 = document.getElementsByClassName("changeButton")[nb];
        let btn2 = document.getElementsByClassName("changeButton-two")[nb];
        // transition
        if (documents[nb].isScrolled) {
            btn1.removeEventListener('click', () => documents[nb].isScrolled ? this.changeScene : () => {});
            btn2.removeEventListener('click', () => documents[nb].isScrolled ? this.changeScene : () => {});
        }
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
        if (this.props.isMounted) {
            this.setState({
                documents: documents
            }, () => {
                setTimeout(() => {
                    document.getElementById("lectures").scrollTo(0, document.getElementsByClassName("lectures-document")[nb].offsetTop);
                    // transition out 
                    if (documents[nb].isScrolled) {
                        btn1.addEventListener('click', () => documents[nb].isScrolled ? this.changeScene : () => {});
                        btn2.addEventListener('click', () => documents[nb].isScrolled ? this.changeScene : () => {});
                    }
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
    }

    hoverPagoda = (i, j) => {
        let floor = this.state.isFloorHovered;
        floor[i][j] = true;
        if (this.props.isMounted) {
            this.setState({
                isFloorHovered: floor
            });
        }
    }

    unhoverPagoda = (i, j) => {
        let floor = this.state.isFloorHovered;
        floor[i][j] = false;
        if (this.props.isMounted) {
            this.setState({
                isFloorHovered: floor
            });
        }
    }

    clickPagoda = (i, j) => {
        let floor = this.state.isFloorClicked;
        floor[i][j] = !floor[i][j];
        if (this.props.isMounted) {
            if (this.props.isMounted) {
                this.setState({
                    isFloorClicked: floor
                });
            }
        }
    }

    clickDelete = (i) => {
        if (this.props.isMounted) {
            let arr = this.state.documents;
            if (arr[i].isScrolled) {
                arr[i].isDeleteClicked = arr[i].isDeleteClicked + 1;
                if (this.props.isMounted) {
                    this.setState({ documents: arr }, () => {
                        let arr = this.state.documents;
                        if (arr[i].isDeleteClicked === 1) {
                            // wait 10 seconds to reset state 0
                            setTimeout(() => {
                                try {
                                    let arr = this.state.documents;
                                    if (arr[i].isDeleteClicked === 0) {
                                        // it means that we already deleted it
                                    } else {
                                        // user don't want to delete
                                        arr[i].isDeleteClicked = 0;
                                        if (this.props.isMounted) {
                                            this.setState({ documents: arr });
                                        }
                                    }
                                }
                                catch (error) {
                                    // already deleted, no need to pursue
                                }
                            }, 10000);
                        }
                        if (arr[i].isDeleteClicked === 2) {
                            // request sent to server
                            axios.delete(`${this.state.server}users/${JSON.parse(localStorage.getItem("isConnected")).id}/opened_documents/${arr[i].id}`)
                                .then(request => {
                                    if (request.status === 201) {
                                        
                                        // process front end
                                        let doc1 = this.state.isFloorClicked;
                                        let doc2 = this.state.isFloorHovered;
                                        arr.splice(i, 1);
                                        doc1.splice(i, 1);
                                        doc2.splice(i, 1);
                                        if (this.props.isMounted) {
                                            this.setState({ documents: arr, isFloorClicked: doc1, isFloorHovered: doc2 });
                                        }
                                    }
                                })
                                .catch(error => {
                                    // nothing to do
                                });

                        }
                    });
                }
            }
        }
    }

    hoverDelButton = (i, bool) => {
        if (this.props.isMounted) {
            let arr = this.state.documents;
            arr[i].isDeleteHovered = bool;
            if (this.props.isMounted) {
                this.setState({ documents: arr });
            }
        }
    }

    hoverValButton = (i, bool) => {
        if (this.props.isMounted) {
            let arr = this.state.documents;
            arr[i].isValidateHovered = bool;
            if (this.props.isMounted) {
                this.setState({ documents: arr });
            }
        }
    }

    clickValidate = (i) => {
        if (this.props.isMounted) {
            let doc = this.state.documents;
            if (doc[i].isScrolled) {
                doc[i].isValidateClicked = !doc[i].isValidateClicked;
                if (this.props.isMounted) {
                    this.setState({ documents: doc });
                }
            }
        }
    }

    ratingHover = (pos, i, j) => {
        if (this.props.isMounted) {
            let doc = this.state.documents;
            if (pos === 0) {
                doc[i].ratingUnderstandingHover = j;
            } else if (pos === 1) {
                doc[i].ratingQualityHover = j;
            }
            this.setState({ documents: doc });
        }
    }

    ratingClick = (pos, i, j) => {
        if (this.props.isMounted) {
            let doc = this.state.documents;
            if (pos === 0) {
                doc[i].ratingUnderstanding = j;
            } else if (pos === 1) {
                doc[i].ratingQuality = j;
            }
            if (this.props.isMounted) {
                this.setState({ documents: doc });
            }
        }
    }

    sendRating = (i) => {
        if (this.props.isMounted) {
            let doc = this.state.documents;
            if (doc[i].ratingQuality !== 0 && doc[i].ratingUnderstanding !== 0) {

                // request
                let obj = {
                    graph_ref:doc[i].id,
                    user_id:JSON.parse(localStorage.getItem("isConnected")).id,
                    comprehension_rating:doc[i].ratingUnderstanding,
                    quality_rating:doc[i].ratingQuality
                }
                axios.post(`${this.state.server}evaluations`, obj, this.state.config)
                    .then(request => {
                        if (request.status === 201) {
                            // hide validate state
                            doc[i].isRated = true;
                            if (this.props.isMounted) {
                                this.setState({ documents: doc });
                            }
                        }
                    })
                    .catch(error => {
                        // nothing to do
                    });
            }
        }
    }

    hoverTitle = (i, bool) => {
        let doc = this.state.documents;
        doc[i].isTitleHover = bool;
        this.setState({documents:doc});
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
                        {DocumentContainer(item, i, styles, this.scrollEv, leftsideScroll, rightsideScroll, fullPagoda, this.props.isOpen, this.hoverValButton,
                            this.hoverDelButton, this.clickDelete, this.clickValidate, this.ratingHover, this.ratingClick, this.sendRating, this.hoverTitle)}

                        <div className={"document-separator"} style={
                            {
                                height: styles.container.separator.height[i],
                                width: styles.container.separator.width,
                                left: styles.container.separator.left[i]
                            }
                        }></div>

                        {PagodaContainer(item, i, styles, this.hoverPagoda, this.unhoverPagoda, this.clickPagoda, this.state, PagodaFloor, 
                            encens, table, reverseScroll, this.props.isOpen)}

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