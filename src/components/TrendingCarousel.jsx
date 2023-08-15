import React from "react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WatchlistButton from '/src/components/WatchlistButton.jsx';
import { Card, Text, Container } from '@nextui-org/react';
import { Splide, SplideSlide } from '@splidejs/react-splide';

function TrendingCarousel() {
  const [trendingData, setTrendingData] = useState([]);

  useEffect(() => {
    const fetchTrendingData = async () => {
      const response = await fetch(
        'https://api.themoviedb.org/3/trending/all/week?api_key=72eaf7b03201f089b626e3c6c35a2eed'
      );
      const data = await response.json();
      setTrendingData(data.results);
    };

    fetchTrendingData();
  }, []);

  return (
    <Container className="carouselContainer">
      <h2>Trending movies and shows</h2>
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
        {trendingData.map((item) => (
          <SplideSlide key={item.id}>
            <Card isHoverable css={{ w: "80%", border:"0" }}>
              <Card.Body css={{ p: 0 }} >
                <Card.Image width="100%" height="100%" objectFit="cover" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} />
              </Card.Body>
            </Card>
            <div>
              <Text className="title">
                <Link to={`/movies/${item.id}`}>{item.title}</Link>
                <Link to={`/series/${item.id}`}>{item.name}</Link>
              </Text>
              <WatchlistButton itemId={item.id} toWatch={item.title} mediaType={item.media_type} onClick={WatchlistButton} />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </Container>
  );
}

export default TrendingCarousel;
