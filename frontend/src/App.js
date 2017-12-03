import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import './Responsive.css';
import * as actions from './actions/auth';
import Header from './components/header/header';
import Landing from './components/landing/landing';
import Listings from './components/listings/listings';
import Profile from "./components/profile/profile";
import Checkout from "./components/checkout/checkout";
import Bookings from "./components/profile/bookings/bookings";
import ProfileInfo from "./components/profile/profileInfo/profileInfo";
import PaymentMethods from "./components/profile/paymentMethods/paymentMethods";
import {withRouter} from 'react-router-dom';
import * as analytics from './actions/analytics';

class App extends Component {

    componentDidMount(){
        this.props.checkSession();
    }

    componentDidUpdate(prevProps) {
      console.log("previous");
      console.log(prevProps.location.pathname);
      console.log("this");
      console.log(this.props.location.pathname);
      if(this.props.location !== prevProps.location) {
        this.props.trackUserActivity(this.props.location);
      }
    }

    render() {
        const isLogged = this.props.isLogged;
        return (
            <div className="page-wrapper">
                {
                    isLogged === undefined ? (
                        <div className="text-center"><h1>Loading...</h1></div>
                    ) : (
                            <div className="inner-page-wrapper">
                                <Header/>
                                <Switch>
                                    <Route exact path='/' render={() => (
                                        <Redirect to="/hotels"/>
                                    )}/>
                                    <Route exact path='/:category' component={Landing}/>
                                    <Route exact path='/:category/listings' component={Listings}/>
                                    <Route exact path='/:category/:id/checkout' render={() => (
                                        !isLogged ? (
                                            <Redirect to="/"/>
                                        ) : (
                                            <Checkout/>
                                        )
                                    )}/>
                                    <Profile>
                                        <Route exact path='/user/profile' render={() => (
                                            !isLogged ? (
                                                <Redirect to="/"/>
                                            ) : (
                                                <ProfileInfo/>
                                            )
                                        )}/>
                                        <Route exact path='/user/paymentMethods' render={() => (
                                            !isLogged ? (
                                                <Redirect to="/"/>
                                            ) : (
                                                <PaymentMethods/>
                                            )
                                        )}/>
                                        <Route exact path='/user/bookings' render={() => (
                                            !isLogged ? (
                                                <Redirect to="/"/>
                                            ) : (
                                                <Bookings/>
                                            )
                                        )}/>
                                    </Profile>
                                </Switch>
                            </div>
                    )
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {isLogged:state.authReducer.isLogged};
}

function mapDispatchToProps(dispatch) {
    return {
        checkSession : () => dispatch(actions.checkSession()),
        trackUserActivity : (page) => dispatch(analytics.trackUserActivity(page))
    };
}

export default withRouter(connect(mapStateToProps , mapDispatchToProps )(props => <App {...props}/>));
