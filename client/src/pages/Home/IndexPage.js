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
      income: [],
      wish: [],
      disabled: true,
    };
  }

  handleSubmit() {
    const data = JSON.parse(localStorage.getItem("user"));
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${data.token}` },
      url: "list",
    };
    axios(options)
      .then((res) => {
        if (res.data && this._isMounted) {
          this.setState({
            success: res.data.message,
            income: res.data.income,
            wish: res.data.wish,
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
          <Link to="/save-income" className="btn btn-warning mb-4">
            SAVE INCOME
          </Link>
          <Link to="/wish-list" className="btn btn-warning mb-4">
            WISH LIST
          </Link>
          <Link
            to="/manage-income"
            className={`btn btn-warning mb-4 ${
              this.state.disabled ? "disabled" : ""
            }`}
          >
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
