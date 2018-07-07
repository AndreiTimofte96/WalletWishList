import React, { Component } from 'react';
import Header from '../../components/pages/Header';
import WishItem from '../../components/pages/WishItem';


export default class History extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="homepage-container">
                <Header />

                <div className="homepage history">
                    <div className="title"> Finished total: 1423 lei </div>
                    <div className="wish-list">
                        <WishItem type="finished"/>
                        <WishItem type="finished"/>
                    </div>
                </div>
            </div>
        );
    }
}