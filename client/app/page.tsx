
import Book from './component/book'
import Adding from './component/Adding'
import Authors from './component/authors'
import {request} from '../lib/graphql-client'

const query = `
query{
    authors{
       name
       id
       
    }
}`



export default async function Home() {
      const {authors} = await request(query)
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
