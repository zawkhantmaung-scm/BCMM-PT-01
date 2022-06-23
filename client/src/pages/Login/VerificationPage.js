import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "../../axios";

class Verification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: "",
      success: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    let token = new URLSearchParams(this.props.location.search).get("token");
    if (!token) {
      this.props.history.push("/login");
      return;
    }
    axios
      .post("verification", { token })
      .then((res) => {
        if (res.data) {
          this.setState({
            success: res.data.message,
          });
          localStorage.setItem("login_email", res.data.email);
        }
      })
      .catch((err) => {
        if (err.response) {
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
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="success">
        <h3 className="mb-4">{this.state.errors || this.state.success}</h3>
        <Link to="/login" className="btn btn-warning">
          Return to Login
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ isLoggedIn: state.auth.isLoggedIn });

export default connect(mapStateToProps)(Verification);
