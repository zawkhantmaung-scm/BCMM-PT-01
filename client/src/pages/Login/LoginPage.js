import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../axios";
import { LOGIN_SUCCESS } from "../../store/actions/types";

class Login extends Component {
  constructor(props) {
    localStorage.removeItem("success");

    super(props);

    this.state = {
      errors: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ email, password }) {
    const { dispatch } = this.props;
    const data = { email, password };

    axios
      .post("login", data)
      .then((res) => {
        /** store logged in user's info to local storage */
        localStorage.setItem("user", JSON.stringify(res.data));
        /** store logged in email to local storage */
        localStorage.setItem("login_email", res.data.user.email);
        /** store logged in user's info to App State */
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
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

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h2>Login Form</h2>
        <p className="error-block txt-error mb-2 mt-2">{this.state.errors}</p>
        <Formik
          initialValues={{
            email: localStorage.getItem("login_email") || "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("The email field is required.")
              .max(191, "The email must not be greater than 191 characters."),
            password: Yup.string()
              .required("The password field is required.")
              .max(
                191,
                "The password must not be greater than 191 characters."
              ),
          })}
          onSubmit={(values) => {
            this.handleSubmit(values);
          }}
        >
          <Form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field name="email" type="email" className="form-control" />
              <div className="txt-error">
                <ErrorMessage name="email" />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field name="password" type="password" className="form-control" />
              <div className="txt-error">
                <ErrorMessage name="password" />
              </div>
            </div>
            <button type="submit" className="btn btn-warning">
              Login
            </button>
          </Form>
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ isLoggedIn: state.auth.isLoggedIn });

export default connect(mapStateToProps)(Login);
