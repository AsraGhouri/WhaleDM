import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
const styles = theme => ({
    links : {
        color: 'white',
        textDecoration: 'none',
        margin : '10px',
        cursor: 'pointer',
    },
    list: {
        display: 'inline-flex',
        listStyleType: 'none'
    }
  });
  
const SignedInLinks = (props) => {
    const { classes } = props;
  return (
    <div>
      <ul className="right" className={classes.list}>
      <li><a onClick={props.signOut} className={classes.links}>Log Out</a></li>
      </ul>
    </div>
  )
}
const mapDispatchToProps = (dispatch) => {
    return {
      signOut: () => dispatch(signOut())
    }
  }
  SignedInLinks.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default connect(null, mapDispatchToProps)(withStyles(styles)(SignedInLinks))