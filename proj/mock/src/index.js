import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import {ApolloProvider} from "react-apollo";
import {ApolloClient} from "apollo-boost";
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';


const client = new ApolloClient({
	uri:"http://192.168.1.8:5000/graphql"
});

ReactDOM.render(
  <Router>
   <ApolloProvider client={client}>
    <App/>
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
