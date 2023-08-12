import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import WatchlistButton from './WatchlistButton.jsx';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Card, Text, Spacer } from '@nextui-org/react';

function SeriesList() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/tv/popular?api_key=72eaf7b03201f089b626e3c6c35a2eed'
        );
        const series = await response.json();
        setSeries(series.results);
      } catch (err) {
        console.log("Error fetching data", err);
      }
    };
    fetchSeries();
  }, []);

  return (
    <div>
      <h2>Popular TV Series</h2>
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
        {series.map((item) => (
          <SplideSlide key={item.id}>
          <Card isHoverable css={{ w: "80%" }}>
            <Card.Body css={{ p:0 }} >
              <Card.Image width="100%" height="100%" objectFit="cover" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} />
            </Card.Body>
            </Card>
            <div>
                  <Text>
                    <Link to={`/movies/${item.id}`}>{item.title}</Link>
                    <Link to={`/series/${item.id}`}>{item.name}</Link>
                  </Text>
              <WatchlistButton itemId={item.id} toWatch={item.title} mediaType={item.media_type} onClick={WatchlistButton} />
            </div>
        </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

export default SeriesList;
