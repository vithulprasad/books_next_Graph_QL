"use client"

import Link from "next/link";
import { request } from '../../lib/graphql-client';
import { useState, useEffect } from "react";

type Author = {
  name: string;
  id: string;
};

const query = `
  query {
    authors {
      name
      id
    }
  }
`;
const Book = () => {
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
console.log(authors,'this is the authores');

  return (
    <div className='p-3 overflow-y-scroll'>
      <div className='h-auto flex flex-wrap gap-3'>
        {authors.map((value: Author, index: number) => (
          <span
            className='h-[40px] p-2 shadow-2xl text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:from-orange-500 hover:via-red-500 hover:to-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
            key={index}
          >
            <Link href={`/component/${value.id}`}>
              <h1>{value.name}</h1>
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Book;