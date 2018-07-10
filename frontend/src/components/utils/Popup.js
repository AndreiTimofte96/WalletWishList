import React, {Component} from 'react';

export default class Popup extends Component{
    constructor(props){
        super(props);
    }

    render(){

        const {text, type} = this.props;


        if (type === "warning"){
            return(
                <div className="popup-wrapper"> 
                    <div className="popup small-text">
                        {text}
                        <div className="buttons">
                            <div className="button" onClick={this.props.closePopup}> Ok! </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (type === "question"){
            return(
                <div className="popup-wrapper"> 
                    <div className="popup">
                        {text}
                        <div className="buttons">
                            <div className="button" onClick={()=>{this.props.handleAnswer("yes");}}> Yes! </div>
                            <div className="button" onClick={()=>{this.props.handleAnswer("no");}}> No! </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (type === "message"){
            return(
                <div className="popup-wrapper"> 

                    
                    <div className="popup">
                        <div className="img"><i className="far fa-check-circle"/></div>
                        {text}
                    </div>
                </div>
            );
        }
    }
}