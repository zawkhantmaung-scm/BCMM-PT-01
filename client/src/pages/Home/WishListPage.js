import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../axios";

class WishList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: "",
      success: "",
    };
  }

  handleSubmit({ item, price }) {
    const data = { item, price };
    axios
      .post("wish", data)
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
        <h2>Wish List</h2>
        <p className="error-block txt-error mb-2 mt-2">
          {this.state.errors || this.state.success}
        </p>
        <Formik
          initialValues={{
            item: "",
            price: "",
          }}
          validationSchema={Yup.object({
            item: Yup.string()
              .required("The item field is required.")
              .max(191, "The item must not be greater than 191 characters."),
            price: Yup.number()
              .typeError("The price field must be a number.")
              .required("The price field is required.")
              .min(
                0,
                "The price field must be between 0 to 10000000000000 amount."
              )
              .max(
                10000000000000,
                "The price field must be between 0 to 10000000000000 amount."
              ),
          })}
          onSubmit={(values) => {
            this.handleSubmit(values);
          }}
        >
          <Form>
            <div className="mb-3">
              <label htmlFor="item" className="form-label">
                Enter Item
              </label>
              <Field name="item" type="text" className="form-control" />
              <div className="txt-error">
                <ErrorMessage name="item" />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Enter Price
              </label>
              <Field name="price" type="text" className="form-control" />
              <div className="txt-error">
                <ErrorMessage name="price" />
              </div>
            </div>
            <button type="submit" className="btn btn-warning">
              Add
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

export default connect(mapStateToProps)(WishList);
