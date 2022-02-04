import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Meals from './pages/Meals';
import NoMatch from './pages/NoMatch';
import Nav from './components/Nav';
import MyProfile from './pages/MyProfile';
import Success from './pages/Success';
import Footer from './components/Footer';

import { StoreProvider } from "./utils/GlobalState";

const httpLink = createHttpLink({
  uri:  '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      user: {
        fields: {
          subscription: {
            merge(existing = [], incoming = []) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
         <StoreProvider>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/meals" component={Meals} />
            <Route exact path="/myprofile" component={MyProfile} />
            <Route exact path="/success" component={Success} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
         </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
