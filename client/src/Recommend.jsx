import { useEffect, useState } from "react";
import axios from "axios";

function Recommend({ movie }) {
  const [movies, setMovies] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!movie) {
      setMovies([]);
      setNotFound(false);
      return;
    }

    const fetchMovies = async () => {
      try {
        console.log("Sending POST request for:", movie);

        const res = await axios.post("http://localhost:5000/recommend", { movie });

        if (typeof res.data === "string" && res.data.toLowerCase().includes("not found")) {
          setNotFound(true);
          setMovies([]);
        } else {
          setNotFound(false);
          setMovies(res.data);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchMovies();
  }, [movie]);

  return (
    <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 mt-6 text-lg sm:text-xl font-light">
    {notFound ? (
      <li className="text-gray-700">Movie not found</li>
    ) : (
      movies.map((val, index) => (
       <li
          key={index}
          className="py-2 px-4 rounded-md text-white bg-red-400 shadow-md hover:bg-red-500 transition"
        >
         <a
          href={`https://www.google.com/search?q=${encodeURIComponent(val)} movie`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {val}
        </a>
        </li>
      ))
    )}
  </ul>
  );
}

export default Recommend;
