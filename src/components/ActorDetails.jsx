import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Image, Button, Container, Spacer, Modal, Row } from "@nextui-org/react"
import Nav from '../components/Navbar.jsx';
import Footer from './Footer.jsx';




const ActorDetails = () => {
  const { actorId } = useParams();
  const [actor, setActor] = useState(null);

  if (!actorId) {
    return <div>Actor not found</div>;
  }
  function aka (actor) {
    if (actor.also_known_as.length > 0) {
      return (
        <p>Also known as: {actor.also_known_as.join(", ")}</p>
      )
    }
  }
  function showDeathday (actor) {
    if (actor.deathday) {
      return (
        <>
        <h3>Date of passing</h3>
        <p>{actor.deathday}</p>
        </>
      )
    }
  }
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=72eaf7b03201f089b626e3c6c35a2eed`)
      .then(response => response.json())
      .then(data => setActor(data))
      .catch(error => console.log(error));
  }, [actorId]);

  if (!actor) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Nav/>
      <Spacer y={3} />
      <Grid.Container justify='center' css={{maxW:"80%"}}>
        <Grid xs={12} sm={6}>
          <Image
            css={{ objectPosition: "top" }}
            width={500}
            showSkeleton={true}
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
          />
        </Grid>
        <Grid xs={12} sm={6} direction="column">
          <h2>{actor.name}</h2>
          <p>{aka(actor)}</p>
          <Spacer y={1} />
          <h3>Known for</h3>
          <p>{actor.known_for_department}</p>
          <Spacer y={1} />
          <h3>Date of birth</h3>
          <p>{actor.birthday}</p>
          <showDeathday actor={actor} />
          <Spacer y={1} />
          <h3>Place of birth</h3>
          <p>{actor.place_of_birth}</p>
          <Spacer y={1} />
          <h3>Biography</h3>
          <p>{actor.biography}</p>
          <Spacer y={1} />
        </Grid>
      </Grid.Container>
      <Footer/>
    </>
  );

};

export default ActorDetails;