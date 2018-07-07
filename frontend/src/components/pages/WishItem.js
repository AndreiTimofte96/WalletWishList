import React, {Component} from 'react';


export default class WishItem extends Component{

    constructor(props){
        super(props);
    }

    render(){

        const {type} = this.props;
        return(
            <div className="wish-item">
                <div className="text">
                    <div className="color-blue">Lorem ipsum dolor</div>
                    <div><i className="fas fa-money-bill-alt"/></div>
                    <div>2800 lei</div>
                    
                    <div><i className="fas fa-spinner"/></div>
                    <div><i className="far fa-times-circle"/></div>
                    <div><i className="far fa-check-circle"/></div>

                </div>
                
                
                <div className="control">

                    <div className="history">Wish added on: 2018/06/03 16:50:34</div>

                    {type === "finished" && 
                        <div className="history">Wish finished on: 2018/06/03 16:50:34</div>
                    }
                    
                    {type !== "finished" &&     
                        <div className="buttons">        
                            <div className="float-right button"> Delete Wish!</div>
                            <div className="float-right button"> Edit Wish!</div> 
                            <div className="float-right button"> Finish Wish!</div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

