import React, { Component } from 'react';

// components
import BookList from './component/BookList';

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>Reading List</h1>
        <BookList/>
      </div>
    );
  }
}

export default App;
