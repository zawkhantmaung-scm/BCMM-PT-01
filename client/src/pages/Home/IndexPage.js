import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Index extends Component {
  render() {
    return (
      <Fragment>
        <div className="menu">
          <Link to="/save-income" className="btn btn-warning mb-4">
            SAVE INCOME
          </Link>
          <Link to="/wish-list" className="btn btn-warning mb-4">
            WISH LIST
          </Link>
          <Link to="/manage-income" className="btn btn-warning mb-4">
            MANAGE INCOME
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
