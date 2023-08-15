import React from "react";
import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import WatchlistButton from "./WatchlistButton.jsx";
import { Grid, Image, Button, Container, Spacer, Modal, Row } from "@nextui-org/react"
import Nav from "./Navbar.jsx";
import VoteBar from "../hooks/VoteBar.jsx";
import Footer from "./Footer.jsx";

const SerieDetails = () => {
    const { seriesId } = useParams();
    const [serie, setSerie] = useState(null);
    const [actors, setActors] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${seriesId}?api_key=72eaf7b03201f089b626e3c6c35a2eed&append_to_response=videos`)
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
    function VideoModal({ videoId }) {
        const [visible, setVisible] = React.useState(false);

        const getFirstTrailerKey = () => {
            for (const video of serie.videos.results) {
                return video.key;
            }
            return null;
        };

        const handler = () => setVisible(true);
        const closeHandler = () => {
            setVisible(false);
            console.log("closed");
        };

        return (
            <>
                <Button auto onPress={() => setVisible(true)}>Watch Trailer</Button>
                <Modal
                    open={visible}
                    onClose={closeHandler}
                    animation="fadeIn"
                    height="480px"
                    width="640px"
                    blur={true}
                >
                    <iframe
                        height="480px"
                        width="640px"
                        src={`https://www.youtube.com/embed/${getFirstTrailerKey()}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </Modal>
            </>
        );
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
                            src={serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : 'https://site1.etiennecouture.ca/wp-content/uploads/2023/08/placeholder.png'}
                            alt={serie.name}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} direction="column">
                        <h2>{serie.name}</h2>
                        <p>{serie.tagline}</p>
                        <Spacer y={1} />
                        <h3>First air date</h3>
                        <p>{serie.first_air_date}</p>
                        <Spacer y={1} />
                        <h3>Last air date</h3>
                        <p>{serie.last_air_date}</p>
                        <Spacer y={1} />
                        <h3>Number of Seasons and Episodes</h3>
                        <p>Seasons: {serie.number_of_seasons}</p>
                        <p>Episodes: {serie.number_of_episodes}</p>
                        <Spacer y={1} />
                        <h3>Overview</h3>
                        <p>{serie.overview}</p>
                        <Spacer y={1} />
                        <Row>
                            <WatchlistButton itemId={serie.id} toWatch={serie.title} mediaType="tv" />
                            <Spacer x={1} />
                            <VideoModal videoId={serie.videos.results} />
                            <Spacer x={1} />
                            <Link to={`https://www.themoviedb.org/tv/${serie.id}`}>
                                <Button auto>TMDB</Button>
                            </Link>
                        </Row>
                        <Spacer y={1} />
                        <h3>Rating</h3>
                        <VoteBar itemId={serie.vote_average}></VoteBar>
                    </Grid>
                </Grid.Container>
            </div>
            <Spacer y={3} />
            <Grid.Container gap={5} justify="center"  >
                <Grid>
                    <h3>Actors</h3>
                    <Container style={{ height: "250px", overflowY: "scroll", maxWidth: "300px", marginLeft: "0" }}>
                        {actors.map(actor => (
                            <div key={actor.id}>
                                <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
                            </div>
                        ))}
                        <Spacer y={1} />
                    </Container>
                </Grid>
                <Grid>
                    <Image
                        css={{
                            objectPosition: "center",
                            marginLeft: "0",
                            borderRadius: "10px"
                        }}
                        width={500}
                        showSkeleton={true}
                        src={serie.backdrop_path ? `https://image.tmdb.org/t/p/w500${serie.backdrop_path}` : 'https://site1.etiennecouture.ca/wp-content/uploads/2023/08/placeholder.png'}
                    >
                    </Image>
                </Grid>
            </Grid.Container>
            <Spacer y={3} />
            <Footer/>
        </>
    );
};
export default SerieDetails;
