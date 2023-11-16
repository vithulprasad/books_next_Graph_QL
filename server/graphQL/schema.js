const book = require('../models/books')
const author = require('../models/author')
const graphql = require("graphql")
const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLID
} =graphql



const bookType = new GraphQLObjectType({
    name:"bookType",
    fields:()=>({
      name:{type:GraphQLString},
      id:{type:GraphQLID},
      genre:{type:GraphQLString},
      authorId:{
        type:authorType,
        resolve(parent,args){
          console.log(parent);
          return author.findById(parent.authorId)
        }
      }
    })
})
const authorType = new GraphQLObjectType({
  name:"authorType",
  fields:()=>({
    name:{type:GraphQLString},
    age:{type:GraphQLInt},
    id:{type:GraphQLID},
  })
})



const RootQuery = new GraphQLObjectType({
  name:"RootQuery",
  fields:{
    books:{
      type:GraphQLList(bookType),
      resolve(parent,args){
        return book.find()
      }
    },
    book:{
      type:bookType,
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
        console.log(args.id);
        return book.findById(args.id)
      }
    },
   author:{
    type:authorType,
    args:{id:{type:GraphQLID}},
    resolve(parent,args){
      return author.findById(args.id)
    }
   },
   authors:{
    type:GraphQLList(authorType),
    resolve(parent,args){
      return author.find()
    }
   },
   bookOfAuther:{
    type:GraphQLList(bookType),
    args:{id:{type:GraphQLID}},
    resolve(parent,args){
      return book.find({authorId:args.id})
    }
   }
  }
})

const Mutation  = new GraphQLObjectType({
  name:"Mutation",
  fields:{
    addAuthor:{
      type:authorType,
      args:{
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        id:{type:GraphQLID}
      },
      resolve(parent,args){
        console.log(args,'oooooo');
         const data = new author({
          name:args.name,
          age:args.age

         })
        return data.save()
      }
    },
    addBook:{
      type:bookType,
      args:{
        
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        authorId:{type:GraphQLID}
      },
      resolve(parent,args){
        console.log(args);
        const data = new book({
          name:args.name,
          genre:args.genre,
          authorId:args.authorId
        })
        return data.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query:RootQuery,
  mutation:Mutation
})