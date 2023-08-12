import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Grid, Image, Container, Spacer, Text } from "@nextui-org/react";

function ActorList() {
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const fetchActors = async () => {
            try {
                const response = await fetch(
                    'https://api.themoviedb.org/3/trending/person/week?api_key=72eaf7b03201f089b626e3c6c35a2eed'
                );
                const data = await response.json()
                setCast(data.results)
            } catch (err) {
                console.log("Error fetching data", err);
            }
        }
        fetchActors()
    }, []);

    return (
        <div>
            <Text 
            h2
            css={{width:"90%", margin:"auto", marginTop:"2rem", marginBottom:"2rem"}}
            >Popular celebrities of the week</Text>
            <Grid.Container gap={4} justify="center" alignItems="flex-start">
                {cast.map((data) => (
                    <Grid key={data.id}>
                        <Link to={`/actors/${data.id}`}>
                            <Container css={{ maxW: "200", background: "#000", width: "fit-content", padding: "0", height: "425px" }}>
                                <Image
                                    height={300}
                                    width={200}
                                    src={`https://image.tmdb.org/t/p/w200${data.profile_path}`}
                                    alt={data.name} />
                                <Spacer y={0.5} />
                                <Text
                                    h3
                                    className=""
                                    css={{width:"90%"}}
                                >{data.name}
                                </Text>
                                <Spacer y={1} />
                                <Text
                                    className="oneLine"
                                    p
                                    css={{width:"90%"}}
                                    >
                                    {data.known_for_department}
                                </Text>
                            </Container>
                        </Link>
                    </Grid>
                ))}
            </Grid.Container>
        </div>
    )
}
export default ActorList;