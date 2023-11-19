
"use client"
import {request} from '../../../lib/graphql-client'
import {useEffect,useState} from 'react'
import Lind from 'next/link'
interface params{
    params:{id:number}
}

export default  function Page({params}:params){
  const [books,setBooks] = useState([])
    const query = `query{
        bookOfAuther(id:"${params.id}"){
            name
            genre
            id
            authorId{
                name
                age
                id
            }
        }
    }`
useEffect(()=>{
const data = async()=>{
  const {bookOfAuther}: any = await request(query) 
  setBooks(bookOfAuther)
  
}
data()
},[])

  return (
    <>
    <button className='text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 m-6'> 
    <Lind href='/'>back to home</Lind></button>
    <div className="w-1/2 h-screen  p-5 flex flex-wrap gap-3">
    {books.map((value:{name:string,genre:string,id:string,authorId:any},index:number)=>(
        <div key={index} className='w-[200px] h-[250px] flex flex-col justify-center items-center bg-gray-300 p-4 rounded-md shadow-xl'>
            <div className='w-full '> <h1 className='text-green-200 '>Name of the book</h1><span className='text-black font-mono text-2xl font-bold w-full flex justify-center'>{value.name}</span></div>
            <div className='w-full'> <h1 className='text-green-200'>Genre of the book</h1><span className='text-black font-mono text-xl font-bold  w-full flex justify-center'>{value.genre}</span></div>
            <div className='w-full'> <h1 className='text-green-200'>Id of the book</h1><span className='text-black font-mono text-xs font-bold  w-full flex justify-center'>{value.id}</span></div>
            <div className='w-full'> <h1 className='text-green-200'>Author</h1><span className='text-black font-mono text-xl font-bold  w-full flex justify-center'>{value?.authorId.name}</span></div>
        </div>
      ))}
 
    </div>
    </>
  )
}



