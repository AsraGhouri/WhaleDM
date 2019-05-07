import React, { Component } from 'react';
import '../auth/css/Signup.css'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import Navigation from '../Navigation/Navigation';
import Checkbox from '@material-ui/core/Checkbox';
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "transparent",
    boxShadow: "none",
    overflow: "hidden",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: ' #0abde3',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: ' #0abde3',
    color: 'white'
  },
  root: {
    height: 'auto',
    // marginTop: '20px',
    backgroundColor: "transparent",
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  error: {
    color: 'red',
  },
  checkboxLabelA: {
    color: 'white',
    fontSize: '12px',
  },
  checked: {
    marginTop : '20px'
  }
});
class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    isChecked: false,
  }
  handleChange = (e) => {
    const input = e.target;
    const value = input.name === 'isChecked' ? input.checked : input.value;
    this.setState({ [input.name]: value });
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  }
  render() {
    const { auth, authError, classes } = this.props;
    const { isChecked } = this.state;
    const submitDisabled = isChecked === false;
    if (auth.uid) return  <Redirect to="/admin/dashboard" />
    return (
      <div>
        <Navigation />
        <div className={classes.root} id="signup">
          <center>
            <main className={classes.main}>
              <CssBaseline />
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  WhaleDM
              </Typography>
                <form className={classes.form} onSubmit={this.handleSubmit}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="first">First Name</InputLabel>
                    <Input type="text" id='firstName' onChange={this.handleChange} autoComplete="first" autoFocus />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="last">Last Name</InputLabel>
                    <Input type="text" id='lastName' onChange={this.handleChange} autoComplete="last" autoFocus />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input type="email" id='email' onChange={this.handleChange} autoComplete="email" autoFocus />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input type="password" id='password' onChange={this.handleChange} autoComplete="current-password" />
                  </FormControl>
                  <div className={classes.checked}>
                    <Checkbox defaultChecked value="checkedG"
                      className="remember"
                      id="terms"
                      name="isChecked"
                      checked={this.state.isChecked}
                      onChange={this.handleChange}
                      style={{
                        color: "#0abde3",
                      }}
                      type="checkbox"
                      label= " "
                      classes={{ label: classes.checkboxLabelA }}
                      control={<Checkbox value="remember" color="primary" />} />
                    <span className={classes.checkboxLabelA}>
                      being a registered user, you have agreed to the <a href="_blank" className="links">privacy policy</a> and 
                      to the <a href="_blank" className="links">terms of conditions</a> of WhaleDM
                    </span>
                  </div>
                  {authError ? <p className={classes.error}>{authError}</p> : null}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    disabled={submitDisabled}
                  >
                    Sign Up
          </Button>

                </form>
              </Paper>
            </main>
          </center>
        </div>
      </div>
    );
  }
}
SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (creds) => dispatch(signUp(creds))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));
