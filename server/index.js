const express = require('express');
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose');
require('dotenv').config();

const app = express()

mongoose.connect(process.env.mongoURL,{useNewUrlParser: true});
mongoose.connection.once('open',()=>{
  console.log('connect to db');
})

app.use('/graphql',graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000,()=>{
  console.log('now listening for requests on port 4000');
});
