"use client"
import Book from './component/book'
import Adding from './component/Adding'
import Authors from './component/authors'
import {request} from '../lib/graphql-client'
import { useEffect, useState } from 'react'

const query = `
query{
    authors{
       name
       id
       
    }
}`
type Author = {
  name: string;
  id: string;
};



export default  function Home() {
  const [authors, setAuthors] = useState<Author[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await request(query) as { authors: Author[] };
        if (result && result.authors) {
          setAuthors(result.authors);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    
    fetchData();
  }, []);
  return (
    <main className="max-w-md mx-auto bg-white   overflow-hidden md:max-w-full">
      <div className="md:flex">
          <div className='w-full '>
            <h1 className='text-3xl font-mono font-bold'>BOOK & AUTHOR MANAGEMENT</h1>
            <Book/>
            <Adding data={authors}/>
          </div>
    <div className='w-full sm:w-[100%] md:w-[100%] lg:w-[100%] mt-4'>
      <Authors />
    </div>
    </div>
  </main>
  
  )
}
