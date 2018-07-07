import React, {Component} from 'react';

export default class Popup extends Component{
    constructor(props){
        super(props);
    }

    render(){

        const {text, type} = this.props;


        if (type === "question"){
            return(
                <div className="popup-wrapper"> 
                    <div className="popup">
                        {text}
                        <div className="buttons">
                            <div className="button"> Yes! </div>
                            <div className="button"> No! </div>
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