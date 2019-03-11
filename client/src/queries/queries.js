import { gql } from 'apollo-boost';

const getBooksQuery = gql`
{
  books{
    name
    id
  }
}
`;

const getAuthorsQuery = gql`
{
  authors{
    name
    id
  }
}
`;

const addBookMutation = gql`
mutation($name: String!, $genre: String!, $publish_year: Int!, $authorId: ID!){
  addBook(name: $name,genre: $genre, publish_year: $publish_year, authorId: $authorId){
    name
    id
  }
}
`

const getBookQuery = gql`
  query GetBook($id: ID){
    book(id: $id){
      id
      name
      genre
      publish_year
      author{
        id
        name
        age
        books{
          name
          id
        }
      }
    }
  }
`

export {getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery};
