import React, { Component } from 'react';
import { connect } from 'react-redux'
import SignedInLinks from '../layouts/SignedInLinks'
import SignedOutLinks from '../layouts/SignedOutLinks'
import fire from '../../config/Fire';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
const styles = theme => ({
  
})
class Logout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
    };
    this.authListener = this.authListener.bind(this);
    this.logout = this.logout.bind(this);
  }
  logout() {
    fire.auth().signOut();
    // this.props.history.push("/");
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        this.setState({ user });
        //localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        //localStorage.removeItem('user');
      }
    });
  }
  render() {
    const { auth, profile } = this.props;
    // console.log(auth);
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;
    if (!auth.uid) return <Redirect to='/' />
    return (
      <div> {links}
      </div>
    );

  }

}
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
    //to get them ordered 

  }
}
Logout.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(withStyles(styles)(Logout));