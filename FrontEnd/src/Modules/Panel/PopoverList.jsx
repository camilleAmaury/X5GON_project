import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import './PopoverList.scss';

export default class PopoverList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Popover className={this.props.className} id={this.props.id} placement={this.props.placement} isOpen={this.props.isOpen} target={this.props.target}>
                <PopoverHeader>{this.props.title}</PopoverHeader>
                <PopoverBody>
                    {this.props.waitingData ?
                        "Let me a little more time to find what you are looking for !"
                        :
                        this.props.isAnswering ?
                            <div className={"scrollbar"} id={"scrollbardocument"} style={{direction:this.props.placement == "left" ? "rtl" : "ltr"}} >
                                <div className={"list-document"} >
                                    <ol>
                                        {this.props.content}
                                    </ol>
                                </div>
                            </div>
                            :
                            "Tell me what are the keywords of your needs."
                    }
                </PopoverBody>
            </Popover>
        );
    }
}