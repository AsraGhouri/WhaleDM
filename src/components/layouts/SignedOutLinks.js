import React from 'react'
import { NavLink } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
const styles = theme => ({
    links : {
        color: 'white',
        textDecoration: 'none',
        margin : '10px',
    },
    list: {
        display: 'inline-flex',
        listStyleType: 'none'
    }
  });
  
const SignedOutLinks = () => {
    const { classes } = this.props;
    return (
        <div>
            <ul className={classes.list}>
                <li><NavLink className={classes.links} to='/signup'>Signup</NavLink></li>
                <li><NavLink className={classes.links} to='/'>Login</NavLink></li>
            </ul>
        </div>
    )
}
SignedOutLinks.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(SignedOutLinks)