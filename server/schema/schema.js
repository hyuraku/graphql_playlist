const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields:() =>({
    id:{type: GraphQLID},
    name:{type: GraphQLString},
    genre:{type: GraphQLString},
    publish_year:{type:GraphQLInt},
    author:{
      type: AuthorType,
      resolve(parent,args){
        return Author.findById(parent.authorId);
      }
    },
    publisher:{
      type: PublisherType,
      resolve(parent,args){
        return Publisher.findById(parent.publisherId)
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields:() =>({
    id:{type: GraphQLID},
    name:{type: GraphQLString},
    age:{type: GraphQLInt},
    books:{
      type:new GraphQLList(BookType),
      resolve(parent,args){
        return Book.find({authorId: parent.id})
      }
    }
  })
});

const PublisherType = new GraphQLObjectType({
  name: 'Publisher',
  fields:() =>({
    id:{type: GraphQLID},
    name:{type: GraphQLString},
    area:{type: GraphQLString},
    established:{type: GraphQLInt},
    books:{
      type:new GraphQLList(BookType),
      resolve(parent,args){
        return Book.find({authorId: parent.id})
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    book:{
      type: BookType,
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
        return Book.findById(args.id)
      }
    },
    author:{
      type: AuthorType,
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
        return Author.findById(args.id)
      }
    },
    publisher:{
      type: PublisherType,
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
        return Publisher.findById(args.id)
      }
    },
    books:{
      type: new GraphQLList(BookType),
      resolve(parent,args){
        return Book.find({})
      }
    },
    authors:{
      type: new GraphQLList(AuthorType),
      resolve(parent,args){
        return Author.find({})
      }
    },
    publishers:{
      type: new GraphQLList(PublisherType),
      resolve(parent,args){
        return Publisher.find({})
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields:{
    addAuthor:{
      type: AuthorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook:{
      type: BookType,
      args:{
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)},
        publish_year:{type: new GraphQLNonNull(GraphQLInt)},
        publisherId: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve(parent, args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
          publish_year: args.publish_year,
          publisherId: args.publisherId,
        });
        return book.save();
      }
    },
    addPublisher:{
      type: PublisherType,
      args:{
        name: {type: new GraphQLNonNull(GraphQLString)},
        area: {type: new GraphQLNonNull(GraphQLString)},
        established: {type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve(parent, args){
        let publisher = new Publisher({
          name: args.name,
          area: args.area,
          established: args.established,
        });
        return publisher.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
