import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Login/RegisterPage";
import VerificationPage from "../pages/Login/VerificationPage";
import IndexPage from "../pages/Home/IndexPage";
import SaveIncomePage from "../pages/Home/SaveIncomePage";
import WishListPage from "../pages/Home/WishListPage";
import ManageIncomePage from "../pages/Home/ManageIncomePage";
import Success from "../pages/SuccessPage";

const AppRouter = () => (
  <Router>
    <Switch>
      <PublicRoute path="/login" component={LoginPage} />
      <PublicRoute path="/register" component={RegisterPage} />
      <PublicRoute path="/verification" component={VerificationPage} />
      <PublicRoute path="/success" component={Success} />
      <PrivateRoute path="/save-income" component={SaveIncomePage} />
      <PrivateRoute path="/wish-list" component={WishListPage} />
      <PrivateRoute path="/manage-income" component={ManageIncomePage} />
      {/* Declare Before Index Page */}
      <PrivateRoute path="/" component={IndexPage} />

      {/* Redirect all 404's to home */}
      <Redirect to='/' />
    </Switch>
  </Router>
);

export default AppRouter;
