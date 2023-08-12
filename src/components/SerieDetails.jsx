import React from "react";
import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import WatchlistButton from "./WatchlistButton.jsx";
import { Grid, Image, Button, Container, Spacer, Card } from "@nextui-org/react"
import Nav from "./Navbar.jsx";
import VoteBar from "../hooks/VoteBar.jsx";

const SerieDetails = () => {
    const { seriesId } = useParams();
    const [serie, setSerie] = useState(null);
    const [actors, setActors] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${seriesId}?api_key=72eaf7b03201f089b626e3c6c35a2eed`)
            .then(response => response.json())
            .then(data => setSerie(data))
            .catch(error => console.log(error));

        fetch(`https://api.themoviedb.org/3/tv/${seriesId}/aggregate_credits?api_key=72eaf7b03201f089b626e3c6c35a2eed`)
            .then(response => response.json())
            .then(data => setActors(data.cast))
            .catch(error => console.log(error));
    }, [seriesId]);
    if (!serie) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Nav />
            <div className="container">
                <Spacer y={3} />
                <Grid.Container justify="center">
                    <Grid xs={12} sm={6}>
                        <Image
                            width={500}
                            showSkeleton={true}
                            src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                            alt={serie.name}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} direction="column">
                        <h2>{serie.name}</h2>
                        <Spacer y={1} />
                        <p>Number of Seasons: {serie.number_of_seasons}</p>
                        <p>Number of Episodes: {serie.number_of_episodes}</p>
                        <p>First Air Date: {serie.first_air_date}</p>
                        <p>Last Air Date: {serie.last_air_date}</p>
                        <Spacer y={1} />
                        <p>{serie.overview}</p>
                        <Spacer y={1} />
                        <WatchlistButton itemId={serie.id} toWatch={serie.title} mediaType="tv" />
                        <Spacer y={1} />
                        <VoteBar itemId={serie.vote_average}></VoteBar>
                        <Spacer y={1} />
                        <h3>Actors</h3>
                        <Container style={{ height: "250px", overflowY: "scroll", maxWidth: "300px", marginLeft: "0" }}>
                            {actors.map(actor => (
                                <div key={actor.id}>
                                    <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
                                </div>
                            ))}
                        </Container>
                    </Grid>
                </Grid.Container>
            </div>
        </>
    );
};
export default SerieDetails;
