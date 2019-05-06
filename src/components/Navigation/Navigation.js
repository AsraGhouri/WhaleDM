import React, { Component } from 'react';
import './Navigation.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    margin: '10px'
  }
};
class Navigation extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Link to='/signin'>
          <i className="fa">&#xf137;</i>
        </Link>
      </div >
    );
  }
}
Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Navigation);