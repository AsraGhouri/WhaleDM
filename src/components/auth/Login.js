import React, { Component } from 'react';
import '../auth/css/Login.css'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import fire from '../../config/Fire'
import { NavLink } from 'react-router-dom'

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
  links: {
    color: 'rgba(0, 0, 0, 0.87)',
    textDecoration: 'none',
    margin: '10px',
    float: 'right',
    fontSize: '15px',
    paddingTop: '5px',
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
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
    color: 'white'
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: ' #0abde3',
    color: 'white'
  },
  root: {
    height: 'auto',
    marginTop: '50px',
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
  }
});

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    user: {},
    rememberMe: false,
  }
  componentDidMount() {
    this.authListener();
    // <Redirect to='home' />
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        //localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        //localStorage.removeItem('user');
      }
    });
  }
  handleChange = (e) => {
    const input = e.target;
    const value = input.name === 'rememberMe' ? input.checked : input.value;
    this.setState({ [input.name]: value });
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { rememberMe } = this.state;
    localStorage.setItem('rememberMe', rememberMe);
    localStorage.setItem('user', rememberMe ? this.props.signIn(this.state) : '');
    this.props.signIn(this.state)
  }
  componentDidMount() {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const user = rememberMe ? localStorage.getItem('user') : '';
    this.setState({ user, rememberMe });
  }
  render() {

    const { classes } = this.props;
    const { authError, auth, profile } = this.props;
    var txt;
    if (this.state.isChecked) {
      txt = 'checked'
    } else {
      txt = 'unchecked'
    }
    console.log(profile)
    if (auth.uid) return  <Redirect from="/" to="/admin/dashboard" />
    return (
      <div className={classes.root} id="login">
        <center>
          <main className={classes.main}>
            {/* <CssBaseline /> */}
            <Paper className={classes.paper} id="main">
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                WhaleDM
              </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input id="email" name="email" value={this.state.email} onChange={this.handleChange} type="email" autoComplete="email" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input name="password" value={this.state.password} onChange={this.handleChange} type="password" id="password" autoComplete="current-password" />
                </FormControl>
                <FormControlLabel
                  className="remember"
                  name="rememberMe"
                  checked={this.state.rememberMe}
                  onChange={this.handleChange}
                  type="checkbox"
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <NavLink className={classes.links} color="primary" to='/signup'>Register</NavLink>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  type="submit"
                  className={classes.submit}
                >
                  LOGIN
          </Button>
              </form>
              {authError ? <p className={classes.error}>{authError}</p> : null}
            </Paper>
          </main>
        </center>
      </div>
    );
  }
}
SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  console.log(state)
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));
