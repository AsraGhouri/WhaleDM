import React, { Component } from 'react';
import './App.css';
import fire from './config/Fire';
import SignIn from '../src/components/auth/Login'
// import Navigation from '../src/components/Navigation/Navigation';
import { createBrowserHistory } from "history";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignUp from '../src/components/auth/SignUp';
import Dashboard from '../src/components/Dashboard/Dashboard';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// import "../node_modules/bootstrap/dist/css/bootstrap.css";
// import "../src/components/assets/scss/paper-dashboard.scss";
import "../src/components/assets/demo/demo.css";
import Admin from "./material-UI/layouts/Admin.jsx";
import RTL from "./material-UI/layouts/RTL.jsx";
const hist = createBrowserHistory();
import "./material-UI/assets/css/material-dashboard-react.css?v=1.6.0";
const styles = theme => ({
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
    // <Redirect to='home' />
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
    const { classes } = this.props;
    return (
      <BrowserRouter  history={hist}>
        <div className="App">
          {/* <Navigation /> */}
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            {/* <Route path="/admin" component={Admin} />
            <Route path="/rtl" component={RTL} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);