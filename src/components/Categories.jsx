import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Text, Dropdown, Card, Grid } from "@nextui-org/react";
import Navbar from "./Navbar.jsx";

export function MovieCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchMovieCategories = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=72eaf7b03201f089b626e3c6c35a2eed'
        );
        const data = await response.json();
        setCategories(data.genres);
      } catch (err) {
        console.log("Error fetching categories", err);
      }
    };
    fetchMovieCategories();

  }, []);

  return (
    <div>
      <Text
        h2
        css={{ width: "90%", margin: "auto", marginTop: "2rem", marginBottom: "2rem" }}
      >Movie categories</Text>
      <div>
        <Grid.Container gap={2} justify="center">
          {categories.map((category) => (
            <Grid>
              <Card key={category.id}>
                <Card.Body>
                  <Link to={`/category/movie/${category.id}/${category.name}`}>{category.name}</Link>
                </Card.Body>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      </div>
    </div>
  );
}
export function SeriesCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/genre/tv/list?api_key=72eaf7b03201f089b626e3c6c35a2eed'
        );
        const data = await response.json();
        setCategories(data.genres);
      } catch (err) {
        console.log("Error fetching series categories", err);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div>
      <Text
        h2
        css={{ width: "90%", margin: "auto", marginTop: "2rem", marginBottom: "2rem" }}
      >Serie categories</Text>
      <div>
        <Grid.Container gap={2} justify="center">
          {categories.map((category) => (
            <Grid>
              <Card key={category.id}>

                <Card.Body>
                  <Link to={`/category/tv/${category.id}/${category.name}`}>{category.name}</Link>
                </Card.Body>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      </div>
    </div>
  );
}

export function DisplayCategories() {
  return (
    <div>
      <Navbar />
      <MovieCategories />
      <SeriesCategories />
    </div>
  );
}

export default DisplayCategories;