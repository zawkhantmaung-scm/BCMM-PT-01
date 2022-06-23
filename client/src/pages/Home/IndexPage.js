import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Index extends Component {
  render() {
    return (
      <Fragment>
        <div className="menu">
          <Link to="/menu-one" className="btn btn-warning mb-4">
            menu-one
          </Link>
          <Link to="/menu-two" className="btn btn-warning mb-4">
            menu-two
          </Link>
          <Link to="/menu-three" className="btn btn-warning mb-4">
            menu-three
          </Link>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(Index);
