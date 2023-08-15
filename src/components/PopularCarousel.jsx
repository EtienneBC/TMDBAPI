import React from "react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WatchlistButton from './WatchlistButton.jsx';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Card, Text, Spacer } from '@nextui-org/react';


export function PopularMovieCarousel() {
  const [PopularData, setPopularData] = useState([]);

  useEffect(() => {
    const fetchTrendingData = async () => {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=72eaf7b03201f089b626e3c6c35a2eed'
      );
      const data = await response.json();
      setPopularData(data.results);
    };

    fetchTrendingData();
  }, []);

  return (
    <div className="carouselContainer">
      <h2>Popular movies</h2>
      <Splide className="carousel"
        tag="div"
        options={{
          rewind: true,
          gap: '1rem',
          perPage: 5,
          width: '100%',
          breakpoints: {
            1100: {
              perPage: 3,
            },
            640: {
              perPage: 2,
            },
          },
        }}>
        {PopularData.map((item) => (
          <SplideSlide key={item.id}>
            <Card isHoverable css={{ w: "80%", border:"0"  }}>
              <Card.Body css={{ p: 0 }} >
                <Card.Image width="100%" height="100%" objectFit="cover" src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}`:'https://site1.etiennecouture.ca/wp-content/uploads/2023/08/placeholder.png'} alt={item.title || item.name} />
              </Card.Body>
            </Card>
            <div>
              <Text className="title">
                <Link to={`/movies/${item.id}`}>{item.title}</Link>
              </Text>
              <WatchlistButton itemId={item.id} toWatch={item.title} mediaType={item.media_type} onClick={WatchlistButton} />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
export function PopularTVCarousel() {
  const [PopularData, setPopularData] = useState([]);

  useEffect(() => {
    const fetchTrendingData = async () => {
      const response = await fetch(
        'https://api.themoviedb.org/3/tv/popular?api_key=72eaf7b03201f089b626e3c6c35a2eed'
      );
      const data = await response.json();
      setPopularData(data.results);
    };

    fetchTrendingData();
  }, []);

  return (
    <div className="carouselContainer">
      <h2>Popular Series</h2>
      <Splide className="carousel"
        tag="div"
        options={{
          rewind: true,
          gap: '1rem',
          perPage: 5,
          width: '100%',
          breakpoints: {
            1100: {
              perPage: 3,
            },
            640: {
              perPage: 2,
            },
          },
        }}>
        {PopularData.map((serie) => (
          <SplideSlide key={serie.id}>
            <Card isHoverable css={{ w: "80%", border:"0"  }}>
              <Card.Body css={{ p: 0 }} >
                <Card.Image width="100%" height="100%" objectFit="cover" src={serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`:'https://site1.etiennecouture.ca/wp-content/uploads/2023/08/placeholder.png'} alt={serie.title || serie.name} />
              </Card.Body>
            </Card>
            <div>
              <Text className="title">
                <Link to={`/series/${serie.id}`}>{serie.name}</Link>
              </Text>
              <WatchlistButton itemId={serie.id} toWatch={serie.name} mediaType="tv" onClick={WatchlistButton} />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
