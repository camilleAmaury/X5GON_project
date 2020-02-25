import React, { Component } from 'react';

import './Confidentiality.css';
import gako_archi from '../../../../assets/Img/Gako_Architecture.png';

import axios from "axios";

export default class Confidentiality extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            myQuestions : [],
            panelOpened: [true, false],
            isAnimating: false,
            server: "",
            config: {}
        };
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
        this.setState({ server: server, config: config, server2: server2 });
    }

    preparePositions = () => {
        let obj = {};
        // panel
        if (true) {
            // panel
            obj.panel = {
                width: this.props.scene.width,
                height: this.props.scene.height
            };
            obj.panel.left = 0;
            obj.panel.top = 0;
            // subpanel
            obj.subpanel = {
                height: obj.panel.height,
                width: obj.panel.width,
                left1: this.state.panelOpened[0] ? 0 : (- obj.panel.width - 20),
                left2: this.state.panelOpened[1] ? 0 : (20 + obj.panel.width),
                top: 0,
                left3: this.state.panelOpened[1] ? -20 : obj.panel.width
            };
        }

        return obj;
    }

    removeAllOfMyData = () => {
        let obj = {
            "user_id": JSON.parse(localStorage.getItem("isConnected")).id
        }
        axios.delete(`${this.state.server}remove_my_data/`, obj, this.state.config)
        .then(request => {
            
        })
        .catch(error => {
            // nothing
        });
    }
        
    

    render() {
        let styles = this.preparePositions();
        return (
            <div id={"confidentiality"} style={
                {
                    visibility: this.props.isOpen ? "visible" : "hidden",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    backgroundColor: "rgb(242, 177, 95)"
                }
            }>
                <div id={"community-inner"} style={{backgroundColor: "#f2b15f"}}>
            <div className={"sub-panel"} id={"confidentiality"} style={
                {
                    height: styles.subpanel.height,
                    width: styles.subpanel.width,
                    left: styles.subpanel.left2,
                    top: styles.subpanel.top,
                    backgroundColor: "#f2b15f",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column"
                }
            }>
            <div className={"question"} style={
                {
                    marginTop: "20px",
                    width: "80%",
                    display: "grid",
                    gridTemplateColumns: "repeat(11, 1fr)",
                    gridAutoRows: "minmax(50px, auto)",
                    gridGap: "10px",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.3)"
                }
            }>
                <div className={"titleConf"} style={
                    {
                        gridRow: "1",
                        gridColumn: "2/9",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "35px"
                    }
                }>
                    Your data
                </div>
                
                    <span onClick={() => this.removeAllOfMyData()} style={
                    {
                        gridRow: "1",
                        gridColumn: "9/12",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "15px",
                        padding: "5px 5px 5px 5px",
                        borderRadius: "5px",
                        color: "white",
                        boxShadow: "0px 0px 4px 2px rgba(0, 0, 0, 0.27)",
                        backgroundColor: "#b43120"
                    }
                }><b>Remove my data</b></span>
               
                <div className={"content"} style={
                    {
                        gridRow: "2/12",
                        gridColumn: "2/11",
                        display: "flex"
                    }
                }>
                    <p>
                        To work, Gako needs many informations about you. We will explain to you exactly what data we collect and why. 
                        You could make some links with the "How your data are used?" part of this page.<br/><br/>

                        First, at your subscription we collect:<br/>
                        - Your <b>e-mail</b> to send you notifications (if you want) <br/>
                        - A <b>username</b> to allow the community to recognize you<br/>
                        - A <b>password</b> to log in<br/>
                        - Your <b>year after baccalaureat*</b> to adapt the platform to your scholar level (*if your unlucky not to be french, use your end of school diploma)<br/>
                        - Your phone <b>number</b> if you want a personal adaptative learning buddy on your smartphone without internet!<br/><br/>

                        During your navigation, we also collect your traces, here is the list:<br/>
                        - <b>What documents you have opened and when you have opened them</b><br/>
                            Why? We need to improve our recommendation model. Indeed, we fill the field "The users who read this document have also read these documents: ..." by keeping track off the sequence of documents you have consulted<br/>
                            Why? We also need your time activity to adapt your personal adaptative learning buddy<br/>
                        - <b>What documents you have validated</b><br/>
                            Why? We recommend some documents based on keywords of documents that you have already read and validated<br/>
                            Why? It's really useful to detect your affinity and your interest and advise you new documents. Validate documents help us to improve our model and understand precisely your affinities are.<br/>
                        - <b>All your query history</b><br/>
                            Why? First, if you want to ask the same question to the "Oracle", you don't have to wait for the answer because it's already in the database<br/>
                            Why? In the future, we could want to improve our system, to clean the data and retrain our model<br/><br/>

                        <b>Your data aren't sold and we will not sell them</b>
                    </p>
                </div>
            </div>
            <div className={"question"} style={
                {
                    marginTop: "20px",
                    width: "80%",
                    display: "grid",
                    gridTemplateColumns: "repeat(11, 1fr)",
                    gridAutoRows: "minmax(50px, auto)",
                    gridGap: "10px",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.3)"
                }
            }>
                <div className={"titleConf"} style={
                    {
                        gridRow: "1",
                        gridColumn: "2/9",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "35px"
                    }
                }>
                    How your data are used ?
                </div>
                <img src={gako_archi} width={'100%'} alt={"Gako structure"} style={
                    {

                gridArea: "2 / 2 / 2/ 11",
                display: "flex",
                alignItems: "center",

                    }}/>
                    <div className={"content"} style={
                    {
                        gridRow: "3",
                        gridColumn: "2/11",
                        display: "flex"
                    }
                }>
                    <p>
                        Here is our full architecture. As you can see, you are the person to the left of the picture. You interact with the solution throught the front end. The front end communicate with all the API and send your data which are stored into Gako SQL Database.
                        The only API which use your data are "API Back End" (store your data into gako db), API Gako Agent (calculate recommendations, get all event about your actions, generate SMS to motivate you, suggest you a new subjetcs, etc) and the API Sms Sender which only have some data like your username to personalize the messages you will received ONLY IF you fill your phone number during you registered.
                    </p>
            </div> 

            </div>
            </div>
            
            </div>
            
            </div>
        );
    }
}