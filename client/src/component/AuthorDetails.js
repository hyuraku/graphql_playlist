import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getAuthorQuery} from '../queries/queries';

class AuthorDetails extends Component {
  displayAuthorDetail() {
    const {author} = this.props.data;
    console.log(this.props);
    if (author) {
      return (<div>
        <h2>{author.name}</h2>
        <p>{author.age}</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          {
            author.books.map(item => {
              return <li key={item.id}>{item.name}</li>
            })
          }
        </ul>
      </div>);
    } else {
      return (<div>No Author selectd</div>);
    }
  }
  render() {
    return (<div id="book-details">
      {this.displayAuthorDetail()}
    </div>);
  }
}

export default graphql(getAuthorQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.authorId
      }
    }
  }
})(AuthorDetails);
