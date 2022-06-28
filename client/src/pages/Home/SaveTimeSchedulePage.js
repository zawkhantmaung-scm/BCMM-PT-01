import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../axios";

class SaveTimeSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: "",
      success: "",
      todolists: [],
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
    alarm_hr,
    alarm_mi,
    time_to_teeth_hr,
    time_to_teeth_mi,
    breakfast_time_hr,
    breakfast_time_mi,
  }) {
    const alarm = `${alarm_hr}:${alarm_mi}`;
    const time_to_teeth = `${time_to_teeth_hr}:${time_to_teeth_mi}`;
    const breakfast_time = `${breakfast_time_hr}:${breakfast_time_mi}`;
    const data = { alarm, time_to_teeth, breakfast_time };
    this.setState({
      todolists: [
        {
          id: this.state.todolists.length + 1,
          alarm,
          time_to_teeth,
          breakfast_time,
        },
      ],
    });
    const user = JSON.parse(localStorage.getItem("user"));
    const options = {
      method: "POST",
      headers: { Authorization: `Bearer ${user.token}` },
      url: "todolist",
      data,
    };
    axios(options)
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
      url: "todolists",
    };
    axios(options)
      .then((res) => {
        if (res.data && res.data.todolists && this._isMounted) {
          this.setState({
            todolists: res.data.todolists.map((i, j) => {
              return {
                id: (i.id = j + 1),
                alarm: i.alarm.replace(/:([^:]+)$/i, ""),
                time_to_teeth: i.time_to_teeth.replace(/:([^:]+)$/i, ""),
                breakfast_time: i.breakfast_time.replace(/:([^:]+)$/i, ""),
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
        <h2>Save Time Schedule</h2>
        <p className="error-block txt-error mb-2 mt-2">
          {this.state.errors || this.state.success}
        </p>
        <Formik
          initialValues={{
            alarm_hr: "",
            alarm_mi: "",
            time_to_teeth_hr: "",
            time_to_teeth_mi: "",
            breakfast_time_hr: "",
            breakfast_time_mi: "",
          }}
          validationSchema={Yup.object({
            alarm_hr: Yup.string().required(
              "The alarm time hour is required."
            ),
            alarm_mi: Yup.string().required(
              "The alarm time minute is required."
            ),
            time_to_teeth_hr: Yup.string().required(
              "The brush teething time hour is required."
            ),
            time_to_teeth_mi: Yup.string().required(
              "The brush teething time minute is required."
            ),
            breakfast_time_hr: Yup.string().required(
              "The breakfast time hour is required."
            ),
            breakfast_time_mi: Yup.string().required(
              "The breakfast time minute is required."
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
                  <label htmlFor="alarm" className="form-label">
                    Set Alarm Time
                  </label>
                </div>
                <div className="col-2">
                  <Field as="select" name="alarm_hr">
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
                  <Field as="select" name="alarm_mi">
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
                <ErrorMessage name="alarm_hr" />
                <br></br>
                <ErrorMessage name="alarm_mi" />
              </div>
            </div>
            <div>
              <div className="display-flex">
                <div className="col-5">
                  <label htmlFor="time_to_teeth" className="form-label">
                    Time Taken to brush teeth and take a bath
                  </label>
                </div>
                <div className="col-2">
                  <Field as="select" name="time_to_teeth_hr">
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
                  <Field as="select" name="time_to_teeth_mi">
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
                <ErrorMessage name="time_to_teeth_hr" />
                <br></br>
                <ErrorMessage name="time_to_teeth_mi" />
              </div>
            </div>
            <div>
              <div className="display-flex">
                <div className="col-5">
                  <label htmlFor="breakfast_time" className="form-label">
                    Time taken for breakfast
                  </label>
                </div>
                <div className="col-2">
                  <Field as="select" name="breakfast_time_hr">
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
                  <Field as="select" name="breakfast_time_mi">
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
                <ErrorMessage name="breakfast_time_hr" />
                <br></br>
                <ErrorMessage name="breakfast_time_mi" />
              </div>
            </div>
            <button type="submit" className="mt-2 btn btn-warning">
              Add
            </button>
          </Form>
        </Formik>
        { this.state.todolists.length > 0 && (<div>
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th scope="col">NO</th>
                <th scope="col">Set Alarm Time</th>
                <th scope="col">Time Taken to brush teeth and take a bath</th>
                <th scope="col">Time taken for breakfast</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todolists.map((i, j) => (
                <tr key={j}>
                  <td className="col-1">{i.id}</td>
                  <td className="col-3">{i.alarm}</td>
                  <td>{i.time_to_teeth}</td>
                  <td className="col-3">{i.breakfast_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(SaveTimeSchedule);
