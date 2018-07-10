import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../components/pages/Header';
import WishItem from '../../components/pages/WishItem';
import { getFinishedWishes } from '../../actions/historyActions';
import Loader from '../../components/utils/Loader';

class History extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount(){
        this.props.getFinishedWishes();
    }
    render() {

        const { isWishesPending, wishes, totalSum } = this.props;

        if (isWishesPending === true) {
            return (
                <div className="homepage-container">
                    <Header />
                    <Loader/>
                </div>
            );
        }

        return (
            <div className="homepage-container">
                <Header />

                <div className="homepage history">
                    <div className="title"> Finished total: {totalSum} lei </div>
                    <div className="wish-list">

                        {
                            wishes !== null &&
                            wishes.map((wish, index) => {
                                return (<WishItem key={index}
                                    type="finished"
                                    wish={wish}
                                />
                                );
                            })
                        }

                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isWishesSuccess: state.historyReducer.isWishesSuccess,
        isWishesError: state.historyReducer.isWishesError,
        isWishesPending: state.historyReducer.isWishesPending,
        wishesErrorMessage: state.historyReducer.errorMessage,
        wishes: state.historyReducer.wishes,
        totalSum: state.historyReducer.totalSum
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getFinishedWishes,
    }, dispatch);
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(History);