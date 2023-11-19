import {request} from '../lib/graphql-client'

export const list = async (value:any) => {
    console.log(value,'oooooooooooooooooooo');
    
    let query = ""
    if(value.id == "null" ){
         query = `
        query{
            books{
                name
                genre
                authorId{
                    name
                    age
                }
            }
        }`
        const books = request(query)
        return books
    }else{
        query = `
        query{
            bookOfAuther(id:"${value.id}"){
                name
                genre
                authorId{
                    name
                    age
                }
            }
        }`
        
        const books = request(query)
        
        
        return books
    }
 
  

};