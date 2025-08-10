import { useState } from 'react';
import './App.css';
import Recommend from './Recommend';

function App() {
  const [movie, setMovie] = useState('');
  const [submittedMovie, setSubmittedMovie] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', movie);
    setSubmittedMovie(movie);
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="h-screen flex flex-col gap-3 justify-center items-center bg-neutral-700 text-red-400">
        <h1 className="text-6xl font-semibold mb-6">
          Movie Recommender
        </h1>

        <label htmlFor="movie" className="sr-only">
          Search for a movie
        </label>
        <input
          className="w-72 px-4 py-2 rounded-lg border border-neutral-500 text-gray-50 focus:outline-none focus:border-red-500"
          type="text"
          name="movie"
          id="movie"
          placeholder="Search for a movie..."
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
        />

        <button
          type="submit"
          className="border-b-4 border-red-500 px-6 py-3 rounded-lg mt-10 bg-red-400 text-white font-medium shadow-lg 
                     hover:bg-red-400 hover:border-red-500 hover:shadow-xl 
                     active:scale-95 active:translate-y-1 active:shadow-md 
                     transition duration-150 ease-in-out"
        >
          Search
        </button>

        {submittedMovie && <Recommend movie={submittedMovie} />}

      </div>

    </form>
    </>
  );
}

export default App;
