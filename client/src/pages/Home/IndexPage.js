import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../../axios";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: "",
      success: "",
      disabled: true,
    };
  }

  handleSubmit() {
    const data = JSON.parse(localStorage.getItem("user"));
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${data.token}` },
      url: "movie-time",
    };
    axios(options)
      .then((res) => {
        if (res.data && this._isMounted) {
          this.setState({
            success: res.data.message,
            disabled: res.data.disabled,
          });
        }
      })
      .catch((err) => {
        if (err.response && this._isMounted) {
          if (err.response.data.errors) {
            this.setState({
              errors: err.response.data.errors,
            });
          }
        }
      });
  }

  componentDidMount() {
    this._isMounted = true;
    this.handleSubmit();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Fragment>
        <div className="menu">
          <Link to="/setting" className="btn btn-warning mb-4">
            SETTING
          </Link>
          <Link to="/todolists" className="btn btn-warning mb-4">
            TIME SCHEDULE
          </Link>
          <Link to="/bus-schedules" className="btn btn-warning mb-4">
          BUS SCHEDULE
          </Link>
          <Link
            to="/movie-time"
            className={`btn btn-warning mb-4 ${
              this.state.disabled ? "disabled" : ""
            }`}
          >
            DECIDE MOVIE TIME
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
