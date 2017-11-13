import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import './Responsive.css';
import * as actions from './actions/auth';
import Signin from './components/signin/signin';
import Dashboard from './components/dashboard/dashboard';
import Home from './components/dashboard/home/home';

class App extends Component {

  componentWillMount(){
    this.props.checkSession();
  }

  render() {
    const isLogged = this.props.isLogged;
    return (
      <div className="page-wrapper">
      {
        isLogged === undefined ? (
          <div className="text-center"><h1>Loading...</h1></div>
        ) : (
          <BrowserRouter>
            <Switch>
              <Route exact path='/' render={() => (
                isLogged ? (
                  <Redirect to="/home"/>
                ) : (
                  <Signin/>
                )
              )}/>
              <Dashboard>
                <Route path='/home' render={() => (
                  isLogged ? (
                    <Redirect to="/"/>
                  ) : (
                    <Home/>
                  )
                )}/>
              </Dashboard>
            </Switch>
          </BrowserRouter>
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
      checkSession : () => dispatch(actions.checkSession())
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
