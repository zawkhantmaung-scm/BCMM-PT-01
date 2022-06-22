import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "../../axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    let token = new URLSearchParams(this.props.location.search).get('token');

    axios.post("verification", {token})
      .then(res => {
        /** store logged in user's info to local storage */
        localStorage.setItem(
          "login_email",
          JSON.stringify(res.data.email)
        );
      })
      .then(() => this.props.history.push("/"))
      .catch(error => {
        if (error.response) {
          console.error(error.response.data);
          if (error.response.data.errors) {
            this.setState({
              errors: error.response.data.errors
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
          <h3>Verification Complete!</h3>
          <Link to="/login">Return to Login</Link>
        </div>
      )
    }
}

const mapStateToProps = state => ({ isLoggedIn: state.auth.isLoggedIn });

export default connect(mapStateToProps)(Login);
