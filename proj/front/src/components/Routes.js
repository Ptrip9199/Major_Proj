import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import PatientSearch from './PatientSearch';
import PatientAdd from './PatientAdd';
//import AppliedRoute from './AppliedRoutes'


export default function Routes( {appProps} ) {
  return (
    <Switch>
      <Route path="/" exact component={Home} appProps={appProps}/>
      <Route path="/searchpatient" exact component={PatientSearch} appProps={appProps}/>
      <Route path="/addpatient" exact component={PatientAdd} appProps={appProps}/>
      
      { /* Finally, catch all unmatched routes */ }
	  <Route component={NotFound}/>
    </Switch>
  );
}
