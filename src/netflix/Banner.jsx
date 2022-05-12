import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOrigins);
      const random = Math.floor(
        Math.random() * request.data.results.length - 1
      );
      setMovie(request.data.results[random]);
    }

    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
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
      <div className="banner__fadeBottom"></div>
    </header>
  );
};

export default Banner;
