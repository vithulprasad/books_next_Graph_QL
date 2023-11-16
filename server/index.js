
require('dotenv').config()
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphQL/schema');
const cors =require('cors')
const app = express();
const mongodb = require("mongoose")

mongodb.connect(process.env.MONGODB)
mongodb.connection.once("open",()=>{
     console.log("mongodb was connected");
})

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

const PORT = 4000;
app.listen(PORT, () => {
    console.log("listening on port", PORT);
});
