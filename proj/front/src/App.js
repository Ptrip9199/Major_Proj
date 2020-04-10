import React , {useState} from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./styles/App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import  { Redirect } from "react-router-dom";



function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  function handleLogout() {
  userHasAuthenticated(false);
  return <Redirect to="/Login"/>
  }
  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Welcome</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
          {isAuthenticated
            ?<><NavItem onClick = {handleLogout}>Logout</NavItem>
            <LinkContainer to="/DataLoad">
              <NavItem>Patient details</NavItem>
            </LinkContainer></>
            :<>
            <LinkContainer to="/login">
              <NavItem>Login</NavItem>
            </LinkContainer>
            </>
          }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default App;