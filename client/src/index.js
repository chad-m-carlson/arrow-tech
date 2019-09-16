import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {AuthProvider, } from './providers/AuthProvider';
import {BrowserRouter as Router} from 'react-router-dom';
import {initMiddleware, } from 'devise-axios';
import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css'
import App from './App';
import * as serviceWorker from './serviceWorker';

const link = createHttpLink({
  uri: '/graphql'
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

initMiddleware();

ReactDOM.render(
<AuthProvider>
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
</AuthProvider>


, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
