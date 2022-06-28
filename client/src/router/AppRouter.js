import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Login/RegisterPage";
import VerificationPage from "../pages/Login/VerificationPage";
import IndexPage from "../pages/Home/IndexPage";
import SettingPage from "../pages/Home/SettingPage";
import SaveTimeSchedulePage from "../pages/Home/SaveTimeSchedulePage";
import BusSchedulePage from "../pages/Home/BusSchedulePage";
import DecideMovieTimePage from "../pages/Home/DecideMovieTimePage";
import Success from "../pages/SuccessPage";

const AppRouter = () => (
  <Router>
    <Switch>
      <PublicRoute path="/login" component={LoginPage} />
      <PublicRoute path="/register" component={RegisterPage} />
      <PublicRoute path="/verification" component={VerificationPage} />
      <PublicRoute path="/success" component={Success} />
      <PrivateRoute path="/setting" component={SettingPage} />
      <PrivateRoute path="/todolists" component={SaveTimeSchedulePage} />
      <PrivateRoute path="/bus-schedules" component={BusSchedulePage} />
      <PrivateRoute path="/movie-time" component={DecideMovieTimePage} />
      {/* Declare Before Index Page */}
      <PrivateRoute path="/" component={IndexPage} />

      {/* Redirect all 404's to home */}
      <Redirect to='/' />
    </Switch>
  </Router>
);

export default AppRouter;
