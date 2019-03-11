import React, {Component} from 'react';
import ApplloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {Switch, Route} from 'react-router-dom'
import {BrowserRouter} from 'react-router-dom'

// components
import BookList from './component/BookList';
import AddBook from './component/AddBook';
import Header from './component/Header'

// apollo client setup
const client = new ApplloClient({uri: 'http://localhost:4000/graphql'});

class App extends Component {
  render() {
    return (<BrowserRouter>
      <ApolloProvider client={client}>
        <div className="center w85">
          <Header/>
          <div className="ph3 pv1 background-gray">
            <Switch>
              <Route exact path="/"/>
              <Route exact path="/author"/>
            </Switch>
          </div>
        </div>

        <div id="main">
          <h1>Reading List</h1>
          <BookList/>
          <AddBook/>
        </div>
      </ApolloProvider>
    </BrowserRouter>);
  }
}

export default App;
