import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../axios";

class SaveIncome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: "",
      success: "",
    };
  }

  handleSubmit({ income }) {
    const data = { income };
    axios
      .post("income", data)
      .then((res) => {
        if (res.data) {
          this.setState({
            success: res.data.message,
          });
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

  render() {
    return (
      <div>
        <h2>Save Income</h2>
        <p className="error-block txt-error mb-2 mt-2">
          {this.state.errors || this.state.success}
        </p>
        <Formik
          initialValues={{
            income: "",
          }}
          validationSchema={Yup.object({
            income: Yup.number()
              .typeError("The number field must be a number.")
              .required("The number field is required.")
              .min(
                0,
                "The number field must be between 0 to 10000000000000 amount."
              )
              .max(
                10000000000000,
                "The number field must be between 0 to 10000000000000 amount."
              ),
          })}
          onSubmit={(values) => {
            this.handleSubmit(values);
          }}
        >
          <Form>
            <div className="mb-3">
              <label htmlFor="income" className="form-label">
                Enter Monthly Income Amount
              </label>
              <Field name="income" type="text" className="form-control" />
              <div className="txt-error">
                <ErrorMessage name="income" />
              </div>
            </div>
            <button type="submit" className="btn btn-warning">
              Save
            </button>
          </Form>
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(SaveIncome);
