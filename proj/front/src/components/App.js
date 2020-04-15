import React from 'react';
import Routes from "./Routes"
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App(){

   return(
   		<div >
   		<ul>
           <li><Link to="/">Home</Link></li>
           <li><Link to="/addpatient">Add Patient</Link></li>
           <li><Link to="/searchpatient">Search Patient</Link></li>
          </ul>
      <Routes />
    </div>
	   	);
  
  }

		
	
		