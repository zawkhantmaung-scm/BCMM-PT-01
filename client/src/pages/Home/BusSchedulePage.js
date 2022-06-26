import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../axios";

class BusSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: "",
      success: "",
      bus_schedules: [],
      pag: 1,
      isDisabled: () => {
        if (this.state.bus_schedules.length > 0) {
          return (
            this.state.bus_schedules.length % (this.state.pag * 10) ===
              this.state.bus_schedules.length ||
            this.state.bus_schedules.length % (this.state.pag * 10) === 0
          );
        }
        return false;
      },
      isPag: () => {
        return this.state.bus_schedules.filter((i, j) => {
          return j >= (this.state.pag - 1) * 10 && j < this.state.pag * 10;
        });
      },
      hr: () => {
        return Array.from({ length: 25 }, (v, k) =>
          `${k}`.length > 1 ? k : "0" + k
        );
      },
      mi: () => {
        return Array.from({ length: 60 }, (v, k) =>
          `${k}`.length > 1 ? k : "0" + k
        );
      },
    };
  }

  handleSubmit({ bus_time_hr, bus_time_mi }) {
    const bus_time = `${bus_time_hr}:${bus_time_mi}`;
    const data = { bus_time };
    this.state.bus_schedules.push({
      id: this.state.bus_schedules.length + 1,
      bus_time,
    });
    axios
      .post("bus-schedule", data)
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
      url: "bus-schedules",
    };
    axios(options)
      .then((res) => {
        if (res.data && res.data.bus_schedules && this._isMounted) {
          this.setState({
            bus_schedules: res.data.bus_schedules.map((i, j) => {
              return {
                id: (i.id = j + 1),
                bus_time: i.bus_time.replace(/:([^:]+)$/i, ""),
              };
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
        <h1>Bus Schedule</h1>
        <p className="error-block txt-error mb-2 mt-2">
          {this.state.errors || this.state.success}
        </p>
        <Formik
          initialValues={{
            bus_time_hr: "",
            bus_time_mi: "",
          }}
          validationSchema={Yup.object({
            bus_time_hr: Yup.string().required(
              "The bus time hour is required."
            ),
            bus_time_mi: Yup.string().required(
              "The bus time minute is required."
            ),
          })}
          onSubmit={(values) => {
            this.handleSubmit(values);
          }}
        >
          <Form>
            <div>
              <div className="display-flex">
                <div className="col-5">
                  <label htmlFor="bus_time" className="form-label">
                    Bus Time
                  </label>
                </div>
                <div className="col-2">
                  <Field as="select" name="bus_time_hr">
                    <option key="bus-time-hr" value="">
                      hr
                    </option>
                    {this.state.hr().map((i, j) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="col-2">
                  <Field as="select" name="bus_time_mi">
                    <option key="bus-time-mi" value="">
                      mi
                    </option>
                    {this.state.mi().map((i, j) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="col-3">
                  <label>(% 24 hour format)</label>
                </div>
              </div>
              <div className="txt-error">
                <ErrorMessage name="bus_time_hr" />
                <br></br>
                <ErrorMessage name="bus_time_mi" />
              </div>
            </div>
            <button type="submit" className="mt-2 btn btn-warning">
              Add
            </button>
          </Form>
        </Formik>
        {this.state.bus_schedules.length > 0 && (<div className="display-column">
          <table className="col-4 table table-bordered mt-4">
            <thead>
              <tr>
                <th scope="col">NO</th>
                <th scope="col">Bus Arrival Time</th>
              </tr>
            </thead>
            <tbody>
              {this.state.isPag().map((i, j) => (
                <tr key={j}>
                  <td className="col-3">{i.id}</td>
                  <td className="col-9">{i.bus_time}</td>
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
        </div>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(BusSchedule);
