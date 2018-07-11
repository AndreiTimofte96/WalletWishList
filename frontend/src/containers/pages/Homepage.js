import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../components/pages/Header';
import WishItem from '../../components/pages/WishItem';
import Loader from '../../components/utils/Loader';
import { getWishes, addWish, deleteWish, changeStatus, checkAuth } from '../../actions/homepageActions';
import { getUserInfo } from '../../actions/userActions';
import Popup from '../../components/utils/Popup';
import getCurrentFormattedTime from '../../utils/dateUtils';


class Homepage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            wish_text: "",
            amount: "",
            inputError: false,
            deletePopup: false,
            finishPopup: false
        };

        this.handleAddWish = this.handleAddWish.bind(this);
        this.handleWishTextInput = this.handleWishTextInput.bind(this);
        this.handleAmountInput = this.handleAmountInput.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);
        this.handleDeleteWish = this.handleDeleteWish.bind(this);
        this.handleDeleteWishAnswer = this.handleDeleteWishAnswer.bind(this);
        this.handleFinishWishAnswer = this.handleFinishWishAnswer.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }

    componentWillMount(){
        const token = localStorage.getItem("wishList_token");
        this.props.checkAuth(token, this.props);
    }

    componentDidMount() {
        this.props.getUserInfo();
        this.props.getWishes();
    }

    componentWillReceiveProps() {
        if (this.props.isAddWishPending === true) {
            this.props.getWishes();
            this.setState({ wish_text: "", amount: "" });
        }
    }

    handleWishTextInput(e) {
        this.setState({ inputError: false, wish_text: e.target.value });
    }

    handleAmountInput(e) {
        this.setState({ inputError: false, amount: e.target.value });
    }

    handleAddWish() {
        const { wish_text, amount } = this.state;

        if (wish_text.length === 0 || amount.length === 0 || (/^\d+$/).test(amount) === false) {
            this.setState({ inputError: true });
            return;
        }

        this.props.addWish({
            wish_text,
            amount: parseInt(amount),
            added_on: getCurrentFormattedTime()
        });
    }

    handleChangeStatus(wish_id, status) {

        if (status === "finished") {

            this.setState({ finishPopup: true, wish_id_fin: wish_id });
        }
        else {
            this.props.changeStatus({
                wish_id,
                status
            });
        }
    }

    handleDeleteWish(wish_id) {
        this.setState({ deletePopup: true, wish_id_del: wish_id });
    }

    handleFinishWishAnswer(answer) {
        if (answer === "yes") {
            this.props.changeStatus({
                wish_id: this.state.wish_id_fin,
                status: "finished",
                finished_on: getCurrentFormattedTime()
            });
        }
        this.setState({ finishPopup: false });
    }

    handleDeleteWishAnswer(answer) {
        if (answer === "yes") {
            this.props.deleteWish({ wish_id: this.state.wish_id_del });
        }
        this.setState({ deletePopup: false });
    }

    handleClosePopup() {
        this.setState({ inputError: false });
    }

    render() {

        const { isWishesPending, wishes, startedSum, inProgressSum, userInfo } = this.props;
        const { wish_text, amount, inputError, deletePopup, finishPopup } = this.state;

        
        if (isWishesPending === true) {
            return (
                <div className="homepage-container">
                    <Header history={this.props.history}/>
                    <Loader />
                </div>
            );
        }


        return (
            <div className="homepage-container">
                
                <Header history={this.props.history} userName={userInfo ? userInfo.userName : null}/>

                <div className="homepage">
                    <div className="stats">
                        <div> Not started: {startedSum} lei </div>
                        <div> In progress: {inProgressSum} lei </div>
                    </div>
                    <div className="input">
                        <input placeholder="Enter a wish" value={wish_text} onChange={this.handleWishTextInput} />
                        <input placeholder="$$$ lei" className="money" value={amount} onChange={this.handleAmountInput} />
                        <div className="add-button" onClick={this.handleAddWish}> Add Wish!</div>
                    </div>
                    <div className="wish-list">
                        {
                            wishes !== null &&
                            wishes.map((wish, index) => {
                                return (<WishItem key={index}
                                    wish={wish}
                                    deleteWish={this.handleDeleteWish}
                                    changeStatus={this.handleChangeStatus}
                                />
                                );
                            })
                        }
                    </div>
                </div>
                {deletePopup === true &&
                    <Popup type="question"
                        text={"Are you sure you want to delete this wish?"}
                        handleAnswer={this.handleDeleteWishAnswer}
                    />
                }
                {finishPopup === true &&
                    <Popup type="question"
                        text={"Are you sure you want to finish this wish?"}
                        handleAnswer={this.handleFinishWishAnswer}
                    />
                }
                {/* <Popup type="message" text={"Item was deleted!"}/> */}

                {inputError === true &&
                    <Popup type="warning"
                        text={"The fields must not be empty. The $$$ input must contain only digits! "}
                        closePopup={this.handleClosePopup}
                    />
                }
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        isWishesSuccess: state.homepageReducer.isWishesSuccess,
        isWishesError: state.homepageReducer.isWishesError,
        isWishesPending: state.homepageReducer.isWishesPending,
        isAddWishSuccess: state.homepageReducer.isAddWishSuccess,
        isAddWishError: state.homepageReducer.isAddWishError,
        isAddWishPending: state.homepageReducer.isAddWishPending,
        wishesErrorMessage: state.homepageReducer.errorMessage,
        wishes: state.homepageReducer.wishes,
        inProgressSum: state.homepageReducer.inProgressSum,
        startedSum: state.homepageReducer.startedSum,
        userInfo: state.userReducer.userInfo
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getWishes,
        addWish,
        deleteWish,
        changeStatus,
        getUserInfo,
        checkAuth
    }, dispatch);
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Homepage);