import React , { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import * as actions from '../../store/actions/index';
import orangeLogo from '../../../src/assets/images/logoOrange.png';
class Auth extends Component {

    state = {
        login: null,
        password: null
    }

    inputChangeHandler = (event) => {
        let name = event.target.name
        this.setState({
            [name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.login, this.state.password, true)
    }

    
    render () {
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to="/" />
        }
        return (
            <div className="container text-center">
                {authRedirect}
                <form className="form-signin mt-5">
                    <img className="mb-4" src={orangeLogo} alt="" width="72" height="72" style={{borderRadius: "10px"}} />
                    <h1 className="h3 mb-3 font-weight-normal">Veuillez vous identifier</h1>
                    <label htmlFor="inputText" className="sr-only">Login</label>
                    <input type="text" onChange={this.inputChangeHandler} id="inputText" className="form-control mb-3" placeholder="Login" name="login" required autoFocus/>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" onChange={this.inputChangeHandler} id="inputPassword" className="form-control mb-3" placeholder="Password" name="password" required/>
        
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.submitHandler}>Sign in</button>
                </form>
            </div>
            
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}
const mapDispatchToProps = dispatch => {
    return { 
        onAuth : (login,password, isSignup) => dispatch(actions.auth(login,password, isSignup))
        //onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
