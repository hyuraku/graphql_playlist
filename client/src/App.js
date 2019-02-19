import React, { Component } from 'react';
import ApplloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import BookList from './component/BookList';

// apollo client setup
const client = new ApplloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div id="main">
        <h1>Reading List</h1>
        <BookList/>
      </div>
    </ApolloProvider>
    );
  }
}

export default App;
