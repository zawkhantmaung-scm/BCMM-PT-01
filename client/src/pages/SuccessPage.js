import React, { Component } from "react";
import { Link } from "react-router-dom";

class Success extends Component {
  constructor(props) {
    super(props);
    let a = localStorage.getItem('success');
    if (!a) props.history.push("/login")
  }

    render() {
      return (
        <div className="success">
          <h3>We have sent verification code to your email!</h3>
          <Link to="/login">Return to Login</Link>
        </div>
      )
    }
  }

export default Success;
