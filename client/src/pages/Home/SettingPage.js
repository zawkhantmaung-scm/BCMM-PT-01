import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../axios";

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: "",
      success: "",
      settings: [],
      pag: 1,
      isDisabled: () => {
        if (this.state.settings.length > 0) {
          return (
            this.state.settings.length % (this.state.pag * 10) ===
              this.state.settings.length ||
            this.state.settings.length % (this.state.pag * 10) === 0
          );
        }
        return false;
      },
      isPag: () => {
        return this.state.settings.filter((i, j) => {
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

  handleSubmit({
    walking_time_hr,
    walking_time_mi,
    time_taken_to_cinema_hr,
    time_taken_to_cinema_mi,
    movie_time_hr,
    movie_time_mi,
  }) {
    const walking_time = `${walking_time_hr}:${walking_time_mi}`;
    const time_taken_to_cinema = `${time_taken_to_cinema_hr}:${time_taken_to_cinema_mi}`;
    const movie_time = `${movie_time_hr}:${movie_time_mi}`;
    const data = { walking_time, time_taken_to_cinema, movie_time };
    this.state.settings.push({
      id: this.state.settings.length + 1,
      walking_time,
      time_taken_to_cinema,
      movie_time,
    });
    axios
      .post("setting", data)
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
      url: "settings",
    };
    axios(options)
      .then((res) => {
        if (res.data && res.data.settings && this._isMounted) {
          this.setState({
            settings: res.data.settings.map((i, j) => {
              return {
                id: (i.id = j + 1),
                walking_time: i.walking_time.replace(/:([^:]+)$/i, ""),
                /* .replace(/0/i, ""), */ 
                time_taken_to_cinema: i.time_taken_to_cinema.replace(/:([^:]+)$/i, ""),
                /* .replace(/0/i, ""), */ 
                movie_time: i.movie_time.replace(/:([^:]+)$/i, ""),
                /* .replace(/0/i, ""), */
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
        <h2>Setting</h2>
        <p className="error-block txt-error mb-2 mt-2">
          {this.state.errors || this.state.success}
        </p>
        <Formik
          initialValues={{
            walking_time_hr: "",
            walking_time_mi: "",
            time_taken_to_cinema_hr: "",
            time_taken_to_cinema_mi: "",
            movie_time_hr: "",
            movie_time_mi: "",
          }}
          validationSchema={Yup.object({
            walking_time_hr: Yup.string().required(
              "The walking time hour is required."
            ),
            walking_time_mi: Yup.string().required(
              "The walking time minute is required."
            ),
            time_taken_to_cinema_hr: Yup.string().required(
              "The time taken to cinema hour is required."
            ),
            time_taken_to_cinema_mi: Yup.string().required(
              "The time taken to cinema minute is required."
            ),
            movie_time_hr: Yup.string().required(
              "The movie time hour is required."
            ),
            movie_time_mi: Yup.string().required(
              "The movie time minute is required."
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
                  <label htmlFor="walking_time" className="form-label">
                    Select walking time to bus stop
                  </label>
                </div>
                <div className="col-2">
                  <Field as="select" name="walking_time_hr">
                    <option key="walking-time-hr" value="">
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
                  <Field as="select" name="walking_time_mi">
                    <option key="walking-time-mi" value="">
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
                <ErrorMessage name="walking_time_hr" />
                <br></br>
                <ErrorMessage name="walking_time_mi" />
              </div>
            </div>
            <div>
              <div className="display-flex">
                <div className="col-5">
                  <label htmlFor="time_taken_to_cinema" className="form-label">
                    Select time taken to cinema from bus stop
                  </label>
                </div>
                <div className="col-2">
                  <Field as="select" name="time_taken_to_cinema_hr">
                    <option key="time-taken-to-cinema-hr" value="">
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
                  <Field as="select" name="time_taken_to_cinema_mi">
                    <option key="time-taken-to-cinema-mi" value="">
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
                <ErrorMessage name="time_taken_to_cinema_hr" />
                <br></br>
                <ErrorMessage name="time_taken_to_cinema_mi" />
              </div>
            </div>
            <div>
              <div className="display-flex">
                <div className="col-5">
                  <label htmlFor="movie_time" className="form-label">
                    Select movie time
                  </label>
                </div>
                <div className="col-2">
                  <Field as="select" name="movie_time_hr">
                    <option key="movie-time-hr" value="">
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
                  <Field as="select" name="movie_time_mi">
                    <option key="movie-time-mi" value="">
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
                <ErrorMessage name="movie_time_hr" />
                <br></br>
                <ErrorMessage name="movie_time_mi" />
              </div>
            </div>
            <button type="submit" className="mt-2 btn btn-warning">
              Add
            </button>
          </Form>
        </Formik>
        { this.state.settings.length > 0 && (<div>
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th scope="col">NO</th>
                <th scope="col">Walking Time</th>
                <th scope="col">Time taken to Cinema</th>
                <th scope="col">Movie time</th>
              </tr>
            </thead>
            <tbody>
              {this.state.isPag().map((i, j) => (
                <tr key={j}>
                  <td className="col-3">{i.id}</td>
                  <td className="col-3">{i.walking_time}</td>
                  <td className="col-3">{i.time_taken_to_cinema}</td>
                  <td className="col-3">{i.movie_time}</td>
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

export default connect(mapStateToProps)(Setting);
