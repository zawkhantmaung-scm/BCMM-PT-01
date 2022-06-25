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
      wish: [],
      pag: 1,
      isDisabled: () => {
        if (this.state.wish.length > 0) {
          return (
            this.state.wish.length % (this.state.pag * 10) ===
              this.state.wish.length ||
            this.state.wish.length % (this.state.pag * 10) === 0
          );
        }
        return false;
      },
      isPag: () => {
        return this.state.wish.filter((i, j) => {
          return j >= (this.state.pag - 1) * 10 && j < this.state.pag * 10;
        });
      },
    };
  }

  handleSubmit({ item, price }) {
    const data = { item, price };
    this.state.wish.push({ id: this.state.wish.length + 1, item, price });
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

  fetchWishList() {
    const data = JSON.parse(localStorage.getItem("user"));
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${data.token}` },
      url: "list",
    };
    axios(options)
      .then((res) => {
        if (res.data && res.data.wish && this._isMounted) {
          this.setState({
            wish: res.data.wish.map((i, j) => {
              return { id: (i.id = j + 1), item: i.item, price: i.price };
            }),
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

  pagination = (num) => {
    this.setState({
      pag: num,
    });
  };

  componentDidMount() {
    this._isMounted = true;
    this.fetchWishList();
  }

  componentWillUnmount() {
    this._isMounted = false;
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
        {this.state.wish.length > 0 && (
          <div>
            <table className="table table-bordered mt-4">
              <thead>
                <tr>
                  <th scope="col">NO</th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {this.state.isPag().map((i, j) => (
                  <tr key={j}>
                    <td className="col-1">{i.id}</td>
                    <td>{i.item}</td>
                    <td className="col-3">{i.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li
                  onClick={this.pagination.bind(this, this.state.pag - 1)}
                  className={`page-item ${
                    this.state.pag === 1 ? "disabled" : ""
                  }`}
                >
                  <button aria-label="Previous" className="page-link">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </button>
                </li>
                <li
                  onClick={this.pagination.bind(this, this.state.pag + 1)}
                  className={`page-item ${
                    this.state.isDisabled() ? "disabled" : ""
                  }`}
                >
                  <button className={`page-link`} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(WishList);
