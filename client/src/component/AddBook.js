import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: '',
      publish_year: '',
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  displayAuthors() {
    let data = this.props.getAuthorsQuery;
    if (data.loading) {
      return (<option disabled="disabled">Loading authors</option>)
    } else {
      return data.authors.map(author => {
        return (<option key={author.id} value={author.id}>{author.name}</option>)
      });
    }
  }
  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
        publish_year: parseInt(this.state.publish_year)
      },
      refetchQueries: [
        {
          query: getBooksQuery
        }
      ]
    });
  }
  render() {
    return (<div>
      <Button color="danger" onClick={this.toggle}>Add a new book</Button>
      <Modal isOpen={this.state.modal}>
        <form id="add-book" onSubmit={this.submitForm.bind(this)}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <div className="field">
              <label>Book name:</label>
              <input type="text" onChange={(e) => this.setState({name: e.target.value})}/>
            </div>
            <div className="field">
              <label>Genre:</label>
              <input type="text" onChange={(e) => this.setState({genre: e.target.value})}/>
            </div>
            <div className="field">
              <label>Publish_year:</label>
              <input type="number" onChange={(e) => this.setState({publish_year: e.target.value})}/>
            </div>
            <div className="field">
              <label>Author:</label>
              <select onChange={(e) => this.setState({authorId: e.target.value})}>
                <option>Select author</option>
                {this.displayAuthors()}
              </select>
            </div>
            <button>+</button>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>);
  }
}

export default compose(graphql(getAuthorsQuery, {name: "getAuthorsQuery"}), graphql(addBookMutation, {name: "addBookMutation"}))(AddBook);
