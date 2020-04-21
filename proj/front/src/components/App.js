import React from 'react';
import Routes from "./Routes"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav} from 'react-bootstrap';

export default function App(){

   return(
   		<>
      <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Nav.Link href="/">Home</Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav>
        <Nav.Link href="/addpatient">Add Patient</Nav.Link>
        <Nav.Link href="/searchpatient">Search Patient</Nav.Link>    
      </Nav>
      </Navbar>
   		<Routes />
    </>
	   	);
  
  }

		
	
	         