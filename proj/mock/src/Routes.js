import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import DataLoad from "./containers/DataLoad"
import AppliedRoute from "./components/AppliedRoute";

export default function Routes( {appProps} ) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps}/>
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/dataload" exact component={DataLoad} appProps={appProps}/>
      { /* Finally, catch all unmatched routes */ }
	  <Route component={NotFound}/>
    </Switch>
  );
}
