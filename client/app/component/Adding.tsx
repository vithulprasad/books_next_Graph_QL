import { useEffect, useRef, useState } from 'react';
import { addAuthor } from '@/lib/addAuther';
import { addBook } from '@/lib/addBook';

interface Author {
  id: string;
  name: string;
  // Add other properties as needed
}

function Adding({ data }: { data: Author[] }): JSX.Element {
  const [author, setAuthor] = useState<Author[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const bookRef = useRef<HTMLInputElement>(null);
  const genreRef = useRef<HTMLInputElement>(null);
  const [change, setChange] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState('');

  useEffect(() => {
    const values = async () => {
      setAuthor(data);
    };
    values();
  }, [data]);

  const handleSubmitAuthor = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const value = {
        name: nameRef.current?.value,
        age: ageRef.current?.value,
      };
      await addAuthor(value);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitBook = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const data = {
        name: bookRef.current?.value,
        genre: genreRef.current?.value,
        id: selectedAuthor,
      };

      if (selectedAuthor === '' || selectedAuthor === null) {
        alert('Please add an author');
      } else {
        await addBook(data);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAuthor(event.target.value);
  };

  return (
    <>
      {change == false ? (
        <div className="max-w-xl h-[300px] p-5">
          <form
            onSubmit={handleSubmitAuthor}
            className="w-full flex flex-col gap-3 bg-gray-400 rounded-lg shadow-xl items-center p-4"
          >
            <input
              type="text"
              className="h-[50px] w-full p-3"
              placeholder="Author Name"
              ref={nameRef}
            />
            <input
              type="number"
              className="h-[50px] w-full p-3"
              placeholder="Author Age"
              ref={ageRef}
            />
            <button
              type="submit"
              className="w-1/2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Add Author
            </button>
          </form>
          <a
            onClick={() => {
              setChange(true);
            }}
            className="underline text-blue-500"
          >
            Add Book
          </a>
        </div>
      ) : (
        <div className="w-full h-[300px] p-5">
          <form
            onSubmit={handleSubmitBook}
            className="w-full flex flex-col gap-3 bg-green-400 items-center p-4"
          >
            <input
              type="text"
              className="h-[50px] w-full p-3"
              placeholder="Book name"
              ref={bookRef}
            />
            <input
              type="text"
              className="h-[50px] w-full p-3"
              placeholder="Author genre"
              ref={genreRef}
            />
            <select
              value={selectedAuthor}
              onChange={handleSelectChange}
            >
              {author.map((value, index) => (
                <option key={index} value={value.id}>
                  {value.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="w-1/2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Add Book
            </button>
          </form>
          <a
            onClick={() => {
              setChange(false);
            }}
            className="underline text-blue-500"
          >
            Add Author
          </a>
        </div>
      )}
    </>
  );
}

export default Adding;
