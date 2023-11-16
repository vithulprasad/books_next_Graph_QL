import{request} from './graphql-client'



export const addBook = async (value:any) => {
  
    
    console.log(value.name)
  const query =`
  mutation{
    addBook(name:"${value.name}",genre:"${value.genre}",authorId:"${value.id}"){
           name
           genre
       }
         
    }`
const data = await request(query)

return data
};