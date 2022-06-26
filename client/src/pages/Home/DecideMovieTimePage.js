import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: "",
      success: "",
      todolists: [],
      bus_schedules: [],
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
            todolists: res.data.todolists,
            bus_schedules: res.data.bus_schedules,
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

  decideMovieTime() {
    //
    return 'You can catch the time 10:00 AM'
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
      <div>
        <h2>Movie Time</h2>
        <div className="display-flex txt-blue"><h3>{this.decideMovieTime()}</h3></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(Index);
