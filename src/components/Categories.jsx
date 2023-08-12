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
    const fetchMoviePosters = async () => {
      try {
        const categoryPromises = categories.map(async (category) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=72eaf7b03201f089b626e3c6c35a2eed&with_genres=${category.id}&sort_by=popularity.desc&include_adult=false`
          );
          const data = await response.json();
          const movie = data.results[3]; // Get the first movie of the category
          return { ...category, poster: movie.poster_path };
        });

        const categoriesWithPosters = await Promise.all(categoryPromises);
        setCategories(categoriesWithPosters);
      } catch (err) {
        console.log("Error fetching movie posters", err);
      }
    };

    fetchMovieCategories();
    fetchMoviePosters();
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
                <Card.Image src={`https://image.tmdb.org/t/p/w500${category.poster}`} alt={category.name} />
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

    const fetchSeriesPosters = async () => {
      try {
        const categoryPromises = categories.map(async (category) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/tv?api_key=72eaf7b03201f089b626e3c6c35a2eed&with_genres=${category.id}&sort_by=popularity.desc&include_adult=false`
          );
          const data = await response.json();
          const series = data.results[3]; // Get the first series of the category
          console.log(series)
          return { ...category, poster: series.poster_path };
        });

        const categoriesWithPosters = await Promise.all(categoryPromises);
        setCategories(categoriesWithPosters);
      } catch (err) {
        console.log("Error fetching series posters", err);
      }
    };

    fetchCategories();
    fetchSeriesPosters();
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
                <Card.Image src={`https://image.tmdb.org/t/p/w500${category.poster}`} alt={category.name} />
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
  const [selected, setSelected] = useState(new Set(["Choose"]));
  const [selectedCategory, setSelectedCategory] = useState("");

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]

  );

  const handleCategoryChange = (newCategory) => {
    console.log(newCategory);
    setSelectedCategory(newCategory);
  };

  let selectedComponent;
  if (selectedValue === "Movie") {
    selectedComponent = <MovieCategories />;
  } else if (selectedValue === "Series") {
    selectedComponent = <SeriesCategories />;
  }

  return (
    <div>
      <Navbar />
      <Text
        h2
        css={{ width: "90%", margin: "auto", marginTop: "2rem", marginBottom: "2rem" }}
      >Categories</Text>
      <Dropdown>
        <Dropdown.Button flat color="secondary" css={{ textTransform: "capitalize" }}>
          {selectedValue}
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Single selection actions"
          color="secondary"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          <Dropdown.Item key="Movie" onClick={() => handleCategoryChange("Movie")}>
            Movie Categories
          </Dropdown.Item>
          <Dropdown.Item key="Series" onClick={() => handleCategoryChange("Series")}>
            Series Categories
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {selectedComponent}
    </div>
  );
}