"use client"

import { useEffect, useState } from 'react'
import {list} from '../../lib/list'


  function Authors() {
    const [datas ,setData] = useState([]) 
   useEffect(()=>{
    const value = async()=>{
        const data = {
            id:"null"
        }
       const {books} = await list(data)
       setData(books)
    }
    value()
   },[])
  
   
    
    return (
        <div className='h-full w-full  p-4'>
           <div className="w-full  flex flex-wrap gap-4">
                {datas.map((value,index)=>(
                    <div key={index} className='w-[280px] h-[150px] bg-slate-50 flex flex-col justify-center items-center shadow-2xl '>
                         <h1 className='w-full text-center flex justify-around font-mono text-2xl font-bold'><span className='text-gray-400'>name:</span>{value.name}</h1>
                         <h1 className='w-full text-center flex justify-around font-mono font-semibold'><span className='text-gray-400'>genre:</span>{value.genre}</h1>
                         <h1 className='w-full text-center flex justify-around font-mono font-semibold'><span className='text-gray-400'>author:</span>{value.authorId.name}</h1>
                         <h1 className='w-full text-center flex justify-around font-mono font-semibold'><span className='text-gray-400'>age:</span>{value.authorId.age}</h1>
                    </div>
                ))}
            </div>
        </div>
   
    )
  }
  
  export default Authors
  