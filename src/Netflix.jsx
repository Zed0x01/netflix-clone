import React from "react";
import Row from "./netflix/Row";
import requests from "./netflix/requests";
import Banner from "./netflix/Banner";
import Nav from "./netflix/Nav";

const Netflix = () => {
  return (
    <div className="netflix">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        isLarge={true}
        fetchUrl={requests.fetchNetflixOrigins}
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Documentary Movies" fetchUrl={requests.fetchDocumentaries} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
    </div>
  );
};

export default Netflix;
