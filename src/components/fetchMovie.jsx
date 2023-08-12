import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import WatchlistButton from './WatchlistButton.jsx';
import { Card, Text, Spacer } from '@nextui-org/react';


function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(
                    'https://api.themoviedb.org/3/movie/popular?api_key=72eaf7b03201f089b626e3c6c35a2eed'
                );
                const data = await response.json()
                setMovies(data.results)
            } catch (err) {
                console.log("Error fetching data", err);
            }
        }
        fetchMovies()
    }, []);

    return (
        <div>
            <h2>Films populaire</h2>
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
                {movies.map((item) => (
                    <SplideSlide key={item.id}>
                        <Card isHoverable css={{ w: "80%" }}>
                            <Card.Body css={{ p: 0 }} >
                                <Card.Image width="100%" height="100%" objectFit="cover" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} />
                            </Card.Body>
                        </Card>
                        <div>
                            <Text>
                                <Link to={`/movies/${item.id}`}>{item.title}</Link>

                            </Text>
                            <WatchlistButton itemId={item.id} toWatch={item.title} mediaType={item.media_type} onClick={WatchlistButton} />
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    )
}
export default MovieList;