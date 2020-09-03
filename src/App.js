import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import Layout from '../src/hoc/Layout/Layout'

import ParticipantsBuilder from './containers/ParticipantsBuilder/ParticipantsBuilder'
import Auth from './containers/Auth/Auth'
import AddParticipant from './containers/AddParticipant/AddParticipant';
import UpdateParticipant from './containers/updateParticipant/updateParticipant';

class App extends Component {
  componentDidMount () {
    this.props.onCheckAuth()
  }

  render() {
    let routes = (
        <Switch>
          <Route path="/" exact component={Auth} />
          <Redirect to="/" />
        </Switch>
    )

    if(this.props.isAuth) {
      routes = (
        <Layout>
          <Switch>
          <Route path="/add" component={AddParticipant} />
            <Route path="/update" component={UpdateParticipant} />
            <Route path="/" exact component={ParticipantsBuilder} />
          </Switch>
        </Layout>)
    }
    
    return (
      <div >
          {routes}
        
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
     isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuth: () => {dispatch(actions.authCheckState())},
    //onUpdateHeader: () => {dispatch(actions.updateHeader())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
