import React from "react";
import SearchBar from "../components/searchBar.jsx";
import Nav from "../components/Navbar.jsx";
import { Text } from "@nextui-org/react";
import Footer from "../components/Footer.jsx";


const MoviePage = () => {
  return (
    <div>
      <Nav />
      <Text
        h2
        css={{ width: "90%", margin: "auto", marginTop: "2rem", marginBottom: "2rem" }}
      >Movies</Text>
      <SearchBar />
      <Footer />
    </div>
  );
};

export default MoviePage;
