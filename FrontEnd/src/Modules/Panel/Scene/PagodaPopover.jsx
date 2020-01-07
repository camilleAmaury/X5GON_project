import React, { Component } from 'react';

import PopoverList from '../PopoverList';
import PopoverClickMe from './PopoverClickMe';

import './PagodaPopover.scss';

export default class PagodaPopover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datakey:0,
        }
    }

    componentDidMount = () => {
        this.setState({
            datakey:this.props.datakey
        })
    }
    hoverFloor = () => {
        this.props.hoverHandle(this.state.datakey);
    }

    onClickFloor = () => {
        this.props.clickHandle(this.state.datakey);
    }

    render() {
        
        return (
            <div id={this.props.id} onMouseEnter={this.hoverFloor} onMouseLeave={this.hoverFloor} onClick={this.onClickFloor}>
                <img src={this.props.hoverFloor ? this.props.srcHover : this.props.src } alt={this.props.id} style={{ visibility: this.props.visible && this.props.data.length > 0 ? "visible" : "hidden" }} />
                {this.props.data.length >= 1 ?
                <PopoverList className={""} id={"scene-pagoda-popover-" + this.props.id} placement={"left"} isOpen={this.props.isOpen && this.props.openFloor} target={this.props.id}
                    title={this.props.data[0].title} content={this.props.data[0].documents.map((item, i) => <li key={i}><a href="#"><span className={"list-document-title"}>{item.title}</span><span className={"list-document-author"}>{item.author}</span><span className={"list-document-keywords"}>{item.keywords.join(" ")}</span></a></li>)}
                    isAnswering={true} waitingData={false}></PopoverList>
                :
                ""
                }
                {this.props.data.length >= 2 ?
                <PopoverList className={""} id={"scene-pagoda-popover-" + this.props.id} placement={"right"} isOpen={this.props.isOpen  && this.props.openFloor} target={this.props.id}
                    title={this.props.data[1].title} content={this.props.data[1].documents.map((item, i) => <li key={i}><a href="#"><span className={"list-document-title"}>{item.title}</span><span className={"list-document-author"}>{item.author}</span><span className={"list-document-keywords"}>{item.keywords.join(" ")}</span></a></li>)}
                    isAnswering={true} waitingData={false}></PopoverList>
                :
                ""
                }
                {this.props.data.length >= 1 && this.props.isOpen && !this.props.openFloor ?
                <PopoverClickMe placement={"right"} isOpen={this.props.hoverFloor} target={this.props.id}></PopoverClickMe>
                :
                ""
                }
                
            </div>
        );
    }
}