import React, { useState } from "react";
import './../styles/App.css';
import axios from 'axios'

const App = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  function handleSearch(e) {
    e.preventDefault()

    axios.get(`https://www.omdbapi.com/?s=${search}&apikey=61e718e9`)
      .then((res) => {
        console.log(res.data.Search);
        setMovies(Object.values(res.data.Search));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (
    <div>
    <form onSubmit={(e)=>handleSearch(e)}>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <button type="submit" >Search</button>
</form> //
      <ul>
        {!movies ? <div className='error'>Invalid movie name. Please try again.</div>
        : movies.map((movie) => (
          <li key={movie.imdbID}>
            <h2>
              {movie.Title} ({movie.Year})
            </h2>
            <img src={movie.Poster} alt={movie.Title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
