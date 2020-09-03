import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Layout.css'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import orangeLogo from '../../assets/images/logoOrange.png';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }


    componentDidMount () {
        //this.props.onUpdateHeader()
    }

    
    render () {
        return (
            <div className="container-fluid">
                <div className={classes.Root}>
                    <AppBar position="static" style={{backgroundColor: "black"}} >
                        <Toolbar style={{alignItems: "flex-end"}} >
                        <IconButton edge="start" className={classes.MenuButton} color="inherit" aria-label="menu">
                        <img src={orangeLogo} alt="" width="72" height="72" style={{borderRadius: "10px"}} />
                        </IconButton>
                        <Typography variant="h6" className={classes.Title}>
                            Gestion des participants
                        </Typography>
                        <Button onClick={this.props.onLogout} color="inherit">Se déconnecter</Button>
                        </Toolbar>
                    </AppBar>
                </div>


                {this.props.children}
                

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        
    }
}
const mapDispatchToProps = dispatch => {
    return {
        //onUpdateHeader: () => dispatch(actions.updateHeader())
        onLogout: () => dispatch(actions.logout())
        }
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout);