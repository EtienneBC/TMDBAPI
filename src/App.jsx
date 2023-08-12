import React from "react";
import { tv } from 'tailwind-variants';
import '../dist/output.css'

import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { NextUIProvider } from "@nextui-org/react";
import { MovieCategories, SeriesCategories, DisplayCategories } from "./components/Categories.jsx";

import TmdbSearch from './components/TmdbSearch.jsx';
import MovieDetails from './components/MovieDetails.jsx';
import ActorDetails from './components/ActorDetails.jsx';
import SerieDetails from './components/SerieDetails.jsx';
import MoviePage from './pages/movies.jsx';
import ActorPage from './pages/actors.jsx';
import SeriePage from './pages/series.jsx';
import About from './pages/about.jsx';
import TrendingCarousel from './components/TrendingCarousel.jsx';
import {PopularMovieCarousel, PopularTVCarousel} from "./components/PopularCarousel.jsx";
import MoviesByCategory from "./components/ByCategory.jsx";
import Watchlist from "./pages/watchlist.jsx";
import Nav from "./components/Navbar.jsx";
import Movie from "./pages/movies.jsx";
import '../public/index.css';
import theme from "./assets/theme.jsx";



const MovieList = () => {
  return (
    <div >
      <Nav />
      <TmdbSearch />
      <TrendingCarousel />
      <PopularMovieCarousel />
      <PopularTVCarousel />
    </div>
  );
};

function App() {
  return (
    <NextUIProvider theme={theme}>
      
      <Router>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/src/pages/movies" element={<Movie />} />
          <Route path="/src/pages/series" element={<SeriePage />} />
          <Route path="/src/pages/actors" element={<ActorPage />} />
          <Route path="/src/pages/categories" element={<DisplayCategories />} />

          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="/series/:seriesId" element={<SerieDetails />} />
          <Route path="/actors/:actorId" element={<ActorDetails />} />
          <Route path="/pages/about" exact={true} element={<About />} />
          <Route path="/pages/watchlist" element={<Watchlist />} />

          <Route path="/movies/" element={<MovieCategories />} />
          <Route path="/category/:mediaType/:categoryId/:categoryName" element={<MoviesByCategory />} />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router >
    </NextUIProvider>
  );
}

export default App;

