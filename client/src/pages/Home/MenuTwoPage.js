import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "../../axios";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      friday: {}
    };
  }

  fetchPostList() {
    const data = JSON.parse(localStorage.getItem("user"))
    const options = {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${data.token}` },
      url: 'v1/friday',
    }
    axios(options).then(res => {
      if (this._isMounted) {
        this.setState(
          {friday: res.data}
        );
      }
    });
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchPostList();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Fragment>
        <div className="row mb-5">
          <h1>Three-{this.state.friday.name}</h1>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(HomePage);
