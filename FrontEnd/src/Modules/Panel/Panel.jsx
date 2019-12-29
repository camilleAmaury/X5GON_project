import React, { Component } from 'react';

import './Panel.scss';

import gif from '../../assets/loadinganimation5.gif';
import scholar from '../../assets/icons/iconScholar.png';
import scholarHover from '../../assets/icons/iconScholarHover.png';
import documentIm from '../../assets/icons/iconDocument.png';
import documentHover from '../../assets/icons/iconDocumentHover.png';
import knowledge from '../../assets/icons/iconKnowledge.png';
import knowledgeHover from '../../assets/icons/iconKnowledgeHover.png';
import account from '../../assets/icons/iconAccount.png';
import accountHover from '../../assets/icons/iconAccountHover.png';

import ListItem from './Listitem';

export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listitems_right : [],
            listitems_left : []
        }
    }

    componentDidMount = () => {
        let listitems_left = [
            {image:documentIm, imageHover:documentHover, alt:"knowledge", title:"Find a Knowledge", details:"As an apprentice, you should learn to new knowledge in order to improve yourself. Just ask for some documents to the librarian !"},
            {image:scholar, imageHover:scholarHover, alt:"scholar", title:"Ask the scholar", details:"Sometimes, those who wrote books also forgot to explain basic context to begginners. Just ask the scholar what you want to know !"}
        ];
        let listitems_right = [
            {image:knowledge, imageHover:knowledgeHover, alt:"rank", title:"Improvement", details:"As an apprentice, you would probably like to see your progression since the begginning of your studies. Just click here !"},
            {image:account, imageHover:accountHover, alt:"account", title:"Apprentice Papers",  details:"Quite boring stuff, but it is really important to have an identity !"}
        ];
        this.setState({
            listitems_right:listitems_right,
            listitems_left:listitems_left
        })
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    changeScholarHover = event => {
        event.preventDefault();
        event.target.setAttribute("src", scholarHover);
    }
    changeScholar = event => {
        event.preventDefault();
        event.target.setAttribute("src", scholar);
    }

    render() {
        return (
            <div id={"container-panel"}>
                <div className={"space-container"}></div>
                <div className={"presentation-container"}>
                    <div className={"presentation-container-pre-title"}>
                        
                    </div>
                    <div className={"presentation-container-title"}>
                        <img src={gif} alt={"potion"} className={"presentation-title-gif"} />
                        <div className={"presentation-container-title-text"}>
                            <span className={"pre-title"}>A X5GON project</span>
                            <span className={"title"}>Knowledge's Recipe</span>
                        </div>
                        <img src={gif} alt={"potion"} className={"presentation-title-gif"} />
                    </div>

                </div>
                <div className={"space-container"}></div>
                <div className={"panel-container"}>
                    <div className={"space-panel-container"}></div>
                    <div className={"left-panel-container"}>
                        <div className={"side-panel-container-title"}>Actions</div>
                        <div className={"side-panel-container-list-container left-list-container"}>
                            {this.state.listitems_left.map((item, i) => <ListItem key={i} image={item.image} imageHover={item.imageHover} alt={item.alt} left={true} title={item.title} details={item.details} detailsTitle={item.detailsTitle}></ListItem>)}
                        </div>
                    </div>
                    <div className={"center-panel-container"}></div>
                    <div className={"right-panel-container"}>
                        <div className={"side-panel-container-title"}>Apprentice's Information</div>
                        <div className={"side-panel-container-list-container right-list-container"}>
                        {this.state.listitems_right.map((item, i) => <ListItem key={i} image={item.image} imageHover={item.imageHover} alt={item.alt} left={false} title={item.title} details={item.details} detailsTitle={item.detailsTitle}></ListItem>)}
                        </div>
                    </div>
                    <div className={"space-panel-container"}></div>
                </div>
            </div>
        );
    }
}