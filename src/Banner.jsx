import React, { useState, useEffect } from "react";
import "./Banner.css";

import axios from "./axios";
import requests from "./Requests";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const randomNum = Math.floor(Math.random() * request.data.results.length);
      setMovie(request.data["results"][randomNum]);
    }

    fetchData();
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string?.substr(0, n - 1) + "..." : string;
  }

  function paintBanner(imagePath) {
    const base_url = "https://image.tmdb.org/t/p/original/";
    return imagePath === undefined
      ? "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Black_flag.svg/1200px-Black_flag.svg.png"
      : base_url + imagePath;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${paintBanner(movie?.backdrop_path)})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
