import { useEffect, useState } from 'react';
import { list } from '../../lib/list';

interface Book {
  name: string;
  genre: string;
  authorId: {
    name: string;
    age: number;
  };
}

function Authors() {
  const [datas, setData] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await list({ id: 'null' });

        // Use type assertion to inform TypeScript about the expected type
        setData((res as { books: Book[] }).books);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='h-full w-full p-4'>
      <div className='w-full flex flex-wrap gap-4'>
        {datas.map((value, index) => (
          <div key={index} className='w-[280px] h-[150px] bg-slate-50 flex flex-col justify-center items-center shadow-2xl '>
            <h1 className='w-full text-center flex justify-around font-mono text-2xl font-bold'>
              <span className='text-gray-400'>name:</span>{value.name}
            </h1>
            <h1 className='w-full text-center flex justify-around font-mono font-semibold'>
              <span className='text-gray-400'>genre:</span>{value.genre}
            </h1>
            <h1 className='w-full text-center flex justify-around font-mono font-semibold'>
              <span className='text-gray-400'>author:</span>{value.authorId.name}
            </h1>
            <h1 className='w-full text-center flex justify-around font-mono font-semibold'>
              <span className='text-gray-400'>age:</span>{value.authorId.age}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Authors;
