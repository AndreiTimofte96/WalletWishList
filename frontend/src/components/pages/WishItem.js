import React, {Component} from 'react';


export default class WishItem extends Component{

    constructor(props){
        super(props);
    }

    render(){

        const {type, wish} = this.props;
        const {wish_text, status, amount, added_on, wish_id, finished_on} = wish;

        return(
            <div className="wish-item">
                <div className="text">
                    <div className="color-blue">{wish_text}</div>
                    <div><i className="fas fa-money-bill-alt"/></div>
                    <div>{amount} lei</div>
                    
                    {status === "not_started" && <div><i className="far fa-times-circle"/></div>}
                    {status === "in_progress" && <div><i className="fas fa-spinner"/></div>}
                    {status === "finished" && <div><i className="far fa-check-circle"/></div>}
                </div>
                
                
                <div className="control">

                    <div className="history">Wish added on: {added_on}</div>

                    {type === "finished" && 
                        <div className="history">Wish finished on: {finished_on}</div>
                    }
                    
                    {type !== "finished" &&     
                        <div className="buttons">        
                            <div className="float-right button" onClick={()=>{this.props.deleteWish(wish_id);}}> Delete Wish!</div>
                            {/* <div className="float-right button"> Edit Wish!</div>  */}
                            <div className="float-right button"  onClick={()=>{this.props.changeStatus(wish_id, "in_progress");}}> Start Wish!</div> 
                            <div className="float-right button"  onClick={()=>{this.props.changeStatus(wish_id, "finished");}}> Finish Wish!</div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

