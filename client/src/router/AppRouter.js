import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Login/RegisterPage";
import VerificationPage from "../pages/Login/VerificationPage";
// import HomePage from "../pages/Home/HomePage";
import IndexPage from "../pages/Home/IndexPage";
import MenuOnePage from "../pages/Home/MenuOnePage";
import MenuTwoPage from "../pages/Home/MenuTwoPage";
import MenuThreePage from "../pages/Home/MenuThreePage";
import Success from "../pages/SuccessPage";

const AppRouter = () => (
  <Router>
    <Switch>
      <PublicRoute path="/login" component={LoginPage} />
      <PublicRoute path="/register" component={RegisterPage} />
      <PublicRoute path="/verification" component={VerificationPage} />
      <PublicRoute path="/success" component={Success} />
      {/* <PrivateRoute path="/" component={HomePage} /> */}
      <PublicRoute path="/menu-one" component={MenuOnePage} />
      <PublicRoute path="/menu-two" component={MenuTwoPage} />
      <PublicRoute path="/menu-three" component={MenuThreePage} />
      {/* Declare Before Index Page */}
      <PrivateRoute path="/" component={IndexPage} />

      {/* Redirect all 404's to home */}
      <Redirect to='/' />
    </Switch>
  </Router>
);

export default AppRouter;
