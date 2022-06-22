import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Login/RegisterPage";
import VerificationPage from "../pages/Login/VerificationPage";
import HomePage from "../pages/Home/HomePage";
import Success from "../pages/SuccessPage";

const AppRouter = () => (
  <Router>
    <Switch>
      <PublicRoute path="/login" component={LoginPage} />
      <PublicRoute path="/register" component={RegisterPage} />
      <PublicRoute path="/verification" component={VerificationPage} />
      <PublicRoute path="/success" component={Success} />
      <PrivateRoute path="/" component={HomePage} />

      {/* Redirect all 404's to home */}
      <Redirect to='/' />
    </Switch>
  </Router>
);

export default AppRouter;
