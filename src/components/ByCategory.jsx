import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import WatchlistButton from './WatchlistButton.jsx';
import { Text, Image, Grid, Container, Col, Pagination } from "@nextui-org/react";
import VoteBar from "../hooks/VoteBar.jsx";
import Nav from "./Navbar.jsx";


function MoviesByCategory() {
    const [movies, setMovies] = useState([]);
    const { categoryId, categoryName, mediaType } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    console.log(categoryId, categoryName, mediaType),
        useEffect(() => {
            const fetchMoviesByCategory = async () => {
                try {
                    const response = await fetch(
                        `https://api.themoviedb.org/3/discover/${mediaType}?api_key=72eaf7b03201f089b626e3c6c35a2eed&with_genres=${categoryId}`
                    );
                    const data = await response.json();
                    setMovies(data.results);
                    setTotalPages(data.total_pages);
                } catch (err) {
                    console.log("Error fetching movies by category", err);
                }
            };
            fetchMoviesByCategory();
        }, [categoryId, categoryName]);

    const handlePaginationChange = async (newPage) => {
        setCurrentPage(newPage);
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/discover/${mediaType}?api_key=72eaf7b03201f089b626e3c6c35a2eed&with_genres=${categoryId}&page=${newPage}`
            );
            const data = await response.json();
            setMovies(data.results);
        } catch (error) {
            console.error("Error fetching movies by category", error);
        }
    };

return (
    <>
    <Nav></Nav>
    <Container>
        <h2>Category {categoryName}</h2>
        <Col fluid>
            <Text h3>Results</Text>
            <Grid.Container gap={2} justify="center" width="fit-content">
                {movies.map((item) => (
                    <Grid xs={12} sm={12} key={item.id} className="shadow-md" direction='row' css={{ maxHeight: "324px", background: "#0C1E3C", marginBottom: "10px", borderRadius: "15px" }}>
                        <Link to={`/movies/${item.id}`}>
                            <Image
                                showSkeleton={true}
                                width={200}
                                height={300}
                                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                alt="Movie poster"
                                css={{ borderRadius: "15px" }}
                                maxDelay={100000}
                            />
                        </Link>
                        <Container css={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <div>
                                <Link to={`/movies/${item.id}`}>
                                    <Text
                                        h3
                                        className="oneLine">{item.title}</Text>
                                </Link>
                                <Link to={`/series/${item.id}`}>
                                    <Text
                                        h3
                                        className="oneLine">{item.name}</Text>
                                </Link>
                            </div>
                            <div>
                                <Text p>{item.release_date}</Text>
                                <Text p>{item.first_air_date}</Text>
                            </div>
                            <div>
                                <Text p className="line-clamp">{item.overview}</Text>
                            </div>
                            <div>
                                <WatchlistButton itemId={item.id} toWatch={item.title} mediaType={mediaType} />
                                <VoteBar itemId={item.vote_average}></VoteBar>
                            </div>
                        </Container>
                    </Grid>
                ))}
                <Pagination total={totalPages} active={currentPage} onChange={handlePaginationChange} />
            </Grid.Container>
        </Col>
    </Container>
    </>
);
}

export default MoviesByCategory;
