import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const ActorDetails = () => {
  const { actorId } = useParams();
  const [actor, setActor] = useState(null);

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
    <div>
      <h2>{actor.name}</h2>
      <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
      <p>{actor.biography}</p>
    </div>
  );
};

export default ActorDetails;