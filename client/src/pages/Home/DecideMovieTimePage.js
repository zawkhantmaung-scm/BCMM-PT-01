import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios";
import moment from "moment";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: "",
      success: "",
      settings: [],
      todolists: [],
      bus_schedules: [],
      disabled: true,
    };
  }

  handleSubmit() {
    const data = JSON.parse(localStorage.getItem("user"));
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${data.token}` },
      url: "movie-time",
    };
    axios(options)
      .then((res) => {
        if (res.data && this._isMounted) {
          this.setState({
            success: res.data.message,
            settings: res.data.settings.map((i, j) => {
              return {
                id: i.id,
                movie_time: i.movie_time.replace(/:([^:]+)$/i, ""),
                time_taken_to_cinema: i.time_taken_to_cinema.replace(
                  /:([^:]+)$/i,
                  ""
                ),
                walking_time: i.walking_time.replace(/:([^:]+)$/i, ""),
              };
            }),
            todolists: res.data.todolists.map((i, j) => {
              return {
                id: i.id,
                alarm: i.alarm.replace(/:([^:]+)$/i, ""),
                breakfast_time: i.breakfast_time.replace(/:([^:]+)$/i, ""),
                time_to_teeth: i.time_to_teeth.replace(/:([^:]+)$/i, ""),
              };
            }),
            bus_schedules: res.data.bus_schedules.map((i, j) => {
              return {
                id: i.id,
                bus_time: i.bus_time.replace(/:([^:]+)$/i, ""),
              };
            }),
            disabled: res.data.disabled,
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

  decideMovieTime() {
    const hr =
      parseInt(this.state.todolists[0]?.alarm.split(":")[0]) +
      parseInt(this.state.todolists[0]?.breakfast_time.split(":")[0]) +
      parseInt(this.state.todolists[0]?.time_to_teeth.split(":")[0]);
    const mi =
      parseInt(this.state.todolists[0]?.alarm.split(":")[1]) +
      parseInt(this.state.todolists[0]?.breakfast_time.split(":")[1]) +
      parseInt(this.state.todolists[0]?.time_to_teeth.split(":")[1]);

    const settings = this.state.settings.map((i) => {
      return {
        id: i.id,
        movie_time: i.movie_time,
        time_taken_to_cinema: i.time_taken_to_cinema,
        walking_time: i.walking_time,
        total: `${hr + parseInt(i.walking_time.split(":")[0])}:${
          mi + parseInt(i.walking_time.split(":")[1])
        }`,
      };
    });

    let bus_schedules = [];
    this.state.bus_schedules.forEach((i) => {
      settings.forEach((j) => {
        bus_schedules.push({
          id: i.id,
          bus_time: i.bus_time,
          is_arrive:
            parseInt(j.total.split(":")[0]) <
              parseInt(i.bus_time.split(":")[0]) ||
            (parseInt(j.total.split(":")[0]) ===
              parseInt(i.bus_time.split(":")[0]) &&
              parseInt(j.total.split(":")[1]) <
                parseInt(i.bus_time.split(":")[1])),
        });
      });
    });
    bus_schedules.forEach((i, j) => {
      settings.forEach((k) => {
        bus_schedules[j] = {
          id: i.id,
          is_arrive: i.is_arrive,
          bus_time: `${
            parseInt(k.time_taken_to_cinema.split(":")[0]) +
            parseInt(i.bus_time.split(":")[0])
          }:${
            parseInt(k.time_taken_to_cinema.split(":")[1]) +
            parseInt(i.bus_time.split(":")[1])
          }`,
        };
      });
    });

    bus_schedules = bus_schedules.filter((i) => i.is_arrive);
    settings.forEach((i, j) => {
      bus_schedules.forEach((k) => {
        settings[j] = {
          id: i.id,
          movie_time: i.movie_time,
          catch_the_time:
            parseInt(k.bus_time.split(":")[0]) <
              parseInt(i.movie_time.split(":")[0]) ||
            (parseInt(k.bus_time.split(":")[0]) ===
              parseInt(i.movie_time.split(":")[0]) &&
              parseInt(k.bus_time.split(":")[1]) <
                parseInt(i.movie_time.split(":")[1])),
        };
      });
    });

    let resp = "";
    for (let obj of settings) {
      if (obj.catch_the_time) {
        resp = moment(obj.movie_time, ["HH:mm"]).format("hh:mm A");
        break;
      }
    }

    return `You can catch the time ${resp}`;
  }

  componentDidMount() {
    this._isMounted = true;
    this.handleSubmit();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <h2>Movie Time</h2>
        <div className="display-flex txt-blue">
          <h3>{this.decideMovieTime()}</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(Index);
