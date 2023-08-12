import React from "react";
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import WatchlistButton from "./WatchlistButton.jsx";
import { Grid, Image, Button, Container, Spacer, Modal, Row } from "@nextui-org/react"
import Nav from "./Navbar.jsx";
import VoteBar from "../hooks/VoteBar.jsx";

const ActorDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);

  function MovieRuntime({ runtime }) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;



    return (
      <p>
        {hours}h{minutes < 10 ? `0${minutes}` : minutes}min
      </p>
    );
  }


  function VideoModal({ videoId }) {
    const [visible, setVisible] = React.useState(false);

    const getFirstTrailerKey = () => {
      for (const video of movie.videos.results) {
        if (video.type === "Trailer") {
          return video.key;
        }
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

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=72eaf7b03201f089b626e3c6c35a2eed&append_to_response=videos`)
      .then(response => response.json())
      .then(data => setMovie(data))
      .catch(error => console.log(error));

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=72eaf7b03201f089b626e3c6c35a2eed`)
      .then(response => response.json())
      .then(data => setActors(data.cast))
      .catch(error => console.log(error));
  }, [movieId]);

  if (!movie) {
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
              css={{ objectPosition: "top" }}
              width={500}
              showSkeleton={true}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </Grid>
          <Grid xs={12} sm={6} direction="column">
            <h2>{movie.title}</h2>
            <p>{movie.tagline}</p>
            <Spacer y={1} />
            <h3>Release date</h3>
            <p>{movie.release_date}</p>
            <Spacer y={1} />
            <h3>Runtime</h3>
            <MovieRuntime runtime={movie.runtime}></MovieRuntime>
            <Spacer y={1} />
            <h3>Genres</h3>
            <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
            <Spacer y={1} />
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <Spacer y={1} />
            <Row>
              <WatchlistButton itemId={movie.id} toWatch={movie.title} mediaType={movie.media_type} />
              <Spacer x={1} />
              <VideoModal videoId={movie.videos.results} />
              <Spacer x={1} />
              <Link to={`https://www.themoviedb.org/movie/${movie.id}`}>
                <Button auto>TMDB</Button>
              </Link>
            </Row>
            <Spacer y={1} />
            <h3>Rating</h3>
            <VoteBar itemId={movie.vote_average}></VoteBar>
          </Grid>
        </Grid.Container>
      </div>
      <Spacer y={3} />
      <Grid.Container gap={5} justify="center"  >
        <Grid>
          <h3>Actors</h3>
          <Container style={{ height: "300px", overflowY: "scroll", maxWidth: "300px", marginLeft: "0" }}>
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
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          >
          </Image>
        </Grid>
      </Grid.Container>
      <Spacer y={3} />

    </>
  );
};

export default ActorDetails;