import React, { Component } from 'react';
import Header from '../../components/pages/Header';
import WishItem from '../../components/pages/WishItem';
// import Popup from '../../components/utils/Popup';


export default class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="homepage-container">
                <Header />

                <div className="homepage">
                    <div className="stats">
                        <div> Listed: 103 lei </div>
                        <div> Finished: 103 lei </div>
                    </div>
                    <div className="input">
                        <input placeholder="Enter a wish" />
                        <input placeholder="$$$ lei" className="money" />
                        <div className="add-button"> Add Wish!</div>
                    </div>
                    <div className="wish-list">
                        <WishItem/>
                        <WishItem/>
                        <WishItem/>
                        <WishItem/>
                        <WishItem/>
                        <WishItem/>
                        <WishItem/>
                        <WishItem/>
                    </div>
                </div>
                {/* <Popup type="question" text={"Are you sure you want to delete this item?"}/> */}
                {/* <Popup type="message" text={"Item was deleted!"}/> */}
            </div>
        );
    }
}