
"use client"
import Link from 'next/link'
import {request} from '../../lib/graphql-client'
const query = `
query{
    authors{
       name
       id
    }
}`



const  book=async()=> {
    const {authors} = await request(query)
  
    
   

  return (
    <div className='   p-3 overflow-y-scroll'>
        <div className='h-auto flex flex-wrap gap-3'>
                {authors.map((value:any,index:number)=>(
                       <span
                       className='h-[40px] p-2 shadow-2xl text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:from-orange-500 hover:via-red-500 hover:to-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                       key={index}
                     >
                       <Link href={`/component/${value.id}`}>{value.name}</Link>
                     </span>
                ))}
        </div>
    </div>
  )
}

export default book
