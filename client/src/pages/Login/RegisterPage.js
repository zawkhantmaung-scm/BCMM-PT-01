import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Error from "../../components/Error";
import axios from "../../axios";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ name, email, password, password_confirmation }) {
    const data = { name, email, password, password_confirmation };

    axios
      .post("register", data)
      .then((res) => {
        localStorage.setItem("success", "res.data.message");
        this.props.history.push("/success", { state: res.data.message });
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data);
          if (error.response.data.errors) {
            this.setState({
              errors: error.response.data.errors,
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
        <h2>Register Form</h2>
        <div className="mb-3">
          <Error errors={this.state.errors} />
        </div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required("The name field is required.")
              .max(191, "The name must not be greater than 191 characters."),
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
            password_confirmation: Yup.string()
              .required("The confirmation password is required.")
              .max(
                191,
                "The confirmation password must not be greater than 191 characters."
              )
              .oneOf(
                [Yup.ref("password"), null],
                "The confirmation password does not match."
              ),
          })}
          onSubmit={(values) => {
            this.handleSubmit(values);
          }}
        >
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <Field name="name" type="text" className="form-control" />
              <div className="txt-error">
                <ErrorMessage name="name" />
              </div>
            </div>
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
            <div className="mb-3">
              <label htmlFor="password_confirmation" className="form-label">
                Confirm Password
              </label>
              <Field
                name="password_confirmation"
                type="password"
                className="form-control"
              />
              <div className="txt-error">
                <ErrorMessage name="password_confirmation" />
              </div>
            </div>
            <button type="submit" className="btn btn-warning">
              Register
            </button>
          </Form>
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ isLoggedIn: state.auth.isLoggedIn });

export default connect(mapStateToProps)(Register);
