import React, { Component } from 'react';

import PopoverList from '../PopoverList';

import './PagodaPopover.scss';

export default class PagodaPopover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverFloor:false,
            openFloor:false,
        }
    }
    hoverFloor = event => {
        this.setState({hoverFloor:true});
    }

    hoverOutFloor = event => {
        this.setState({hoverFloor:false});
    }

    onClickFloor = event => {
        this.setState({openFloor:!this.state.openFloor});
    }

    render() {
        
        return (
            <div id={this.props.id} onMouseEnter={this.hoverFloor} onMouseLeave={this.hoverOutFloor} onClick={this.onClickFloor}>
                <img src={this.props.src} alt={this.props.id} style={{ visibility: this.props.visible && this.props.data.length > 0 ? "visible" : "hidden" }} />
                {this.props.data.length >= 1 ?
                <PopoverList className={""} id={"scene-pagoda-popover-" + this.props.id} placement={"left"} isOpen={this.props.isOpen && (this.state.hoverFloor || this.state.openFloor)} target={this.props.id}
                    title={this.props.data[0].title} content={this.props.data[0].documents.map((item, i) => <li key={i}><a href="#"><span className={"list-document-title"}>{item.title}</span><span className={"list-document-author"}>{item.author}</span><span className={"list-document-keywords"}>{item.keywords.join(" ")}</span></a></li>)}
                    isAnswering={true} waitingData={false}></PopoverList>
                :
                ""
                }
                {this.props.data.length >= 2 ?
                <PopoverList className={""} id={"scene-pagoda-popover-" + this.props.id} placement={"right"} isOpen={this.props.isOpen  && (this.state.hoverFloor || this.state.openFloor)} target={this.props.id}
                    title={this.props.data[1].title} content={this.props.data[1].documents.map((item, i) => <li key={i}><a href="#"><span className={"list-document-title"}>{item.title}</span><span className={"list-document-author"}>{item.author}</span><span className={"list-document-keywords"}>{item.keywords.join(" ")}</span></a></li>)}
                    isAnswering={true} waitingData={false}></PopoverList>
                :
                ""
                }
                
            </div>
        );
    }
}