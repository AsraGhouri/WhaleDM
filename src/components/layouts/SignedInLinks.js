import React from 'react'
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
        fontSize: '14px',
    },
    list: {
        display: 'inline-flex',
        listStyleType: 'none',
        marginLeft: '18px',
        marginTop: '13px'
    }
  });
  
const SignedInLinks = (props) => {
    const { classes } = props;
  return (
    <div>
      <ul className={classes.list}>
      <li onClick={props.signOut} className={classes.links}>Log Out</li>
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