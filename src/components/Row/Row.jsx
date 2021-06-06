import React, { useState, useEffect } from "react";
import axios from "../../axios";

import "./Row.css";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);


  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {movies?.map(
          (movie) =>
            ((isLargeRow && movie?.backdrop_path) ||
              (!isLargeRow && movie?.poster_path)) && (
              <img
                key={movie?.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${base_url}${
                  isLargeRow ? movie?.backdrop_path : movie?.poster_path
                }`}
                alt={movie?.title || movie?.name || movie.origina_name}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;
