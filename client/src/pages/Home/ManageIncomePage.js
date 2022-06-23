import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios";

class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: "",
      success: "",
      income: [],
      wish: [],
      disabled: false,
    };
  }

  handleSubmit() {
    const data = JSON.parse(localStorage.getItem("user"));
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${data.token}` },
      url: "list",
    };
    axios(options)
      .then((res) => {
        if (res.data && this._isMounted) {
          this.setState({
            success: res.data.message,
            income: res.data.income,
            wish: res.data.wish,
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

  max_possible_pair(data = [], max = 0, key = "") {
    //TODO: Replace with module
    data = data
      .filter((i) => i[key] <= max)
      .sort((i, j) => i[key] - j[key])
      .sort((i, j) => i.id - j.id);
    let length = data.length;
    return Array(Math.pow(2, length))
      .fill()
      .map((_, i) => {
        let j = -1,
          k = i,
          res = [];
        while (++j < length) {
          k & 1 && res.push(data[j]);
          k >>= 1;
        }
        return res;
      })
      .slice(1)
      .filter((i) => i.reduce((i, j) => i + j[key], 0) <= max)
      .map((i) => {
        if (i.length === 1) return i.map((j) => j.item);
        return `(${i.map((j) => j.item).join(", ")})`;
      })
      .map((i) => i)
      .join(" OR ");
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
        <h2>Manage Income</h2>
        <table className="table table-bordered mt-4">
          <tbody>
            {this.state.income.map((i) => (
              <tr key={i.id}>
                <td className="col-2">{i.month}</td>
                <td>
                  {this.max_possible_pair(
                    this.state.wish,
                    i.total_extra_money,
                    "price"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(WishList);
