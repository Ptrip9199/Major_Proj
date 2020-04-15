import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import ApolloClient from "apollo-boost";
import {ApolloProvider } from "@apollo/react-hooks";
import {BrowserRouter as Router} from 'react-router-dom';


const client = new ApolloClient({
	uri:"http://192.168.1.11:5000/graphql"
});
	
ReactDOM.render(
  <ApolloProvider client={client}>
	<Router>
	    <App/>
    </Router>
   </ApolloProvider>,
   document.getElementById('root')
);