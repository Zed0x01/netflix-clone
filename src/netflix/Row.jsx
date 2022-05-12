import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import movieTrailer from "movie-trailer";
import "./index.css";

const Row = ({ title, fetchUrl, isLarge }) => {
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const [trailerUrl, setTrailerUrl] = useState();
  const [Movies, setMovies] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original/";

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

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
      <h2>{title}</h2>
      <div className="row__posters">
        {Movies.map((movie) => (
          <img
            onClick={() => handleClick(movie.name)}
            key={movie.id}
            className={`row__poster ${isLarge && "row__posterLarge"}`}
            src={`${base_url}${
              isLarge ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
