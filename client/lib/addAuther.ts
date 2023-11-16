import{request} from './graphql-client'



export const addAuthor = async (value:any) => {
    console.log(value.name,'kkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    
  const query =`
  mutation{
    addAuthor(name:"${value.name}",age:${value.age}){
           name
           age
       }
         
    }`
const data = await request(query)

return data
};