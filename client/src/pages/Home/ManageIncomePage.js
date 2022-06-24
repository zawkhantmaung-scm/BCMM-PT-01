import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios";
import max_possible_pair from "max_possible_pair";

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
                  {max_possible_pair(
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
