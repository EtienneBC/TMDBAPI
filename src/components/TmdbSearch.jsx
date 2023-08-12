import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Textarea, Card, Grid, Text, Group, Spacer  } from "@nextui-org/react";


const TmdbSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (query.trim() !== '') {
            const movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=72eaf7b03201f089b626e3c6c35a2eed`);
            const movieData = await movieResponse.json();

            const serieResponse = await fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&api_key=72eaf7b03201f089b626e3c6c35a2eed`);
            const serieData = await serieResponse.json();

            const castResponse = await fetch(`https://api.themoviedb.org/3/search/person?query=${query}&api_key=72eaf7b03201f089b626e3c6c35a2eed`);
            const castData = await castResponse.json();

            const combinedResults = [...movieData.results, ...serieData.results, ...castData.results];
            setResults(combinedResults);
        } else {
            setResults([]);
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    };
    const handleClearSearch = () => {
        setQuery('');
        setResults([]);
    };

    return (
        <div id="SearchHeader" style={{ display: "flex", flexDirection: "column", justifyContent:"space-between" }}>
            <div className="HeaderText">
                <h3>You have access to a vast collection of </h3>
                <h2>Films, series, celebrities and more.</h2>
                <h4>Start browsing now.</h4>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", width: "100%"}}>
                <Textarea fullWidth maxRows="1" type="text" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={handleKeyPress} placeholder="Search movies, tv shows, people,…" />
                <Button.Group>
                    <Button auto="true" onClick={handleSearch}>Search</Button>
                    <Button auto="true" onClick={handleClearSearch}>Clear</Button>
                </Button.Group>
            </div>
            <Spacer></Spacer>
            {results.length > 0 ? (
                <Grid.Container gap={2} justify="flex-start" className="SearchResult">
                    {results.map((result) => (
                        <Grid xs={6} sm={3} key={result.id}>
                            <Card isPressable>
                                {result.poster_path && (
                                    <Card.Image
                                        src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                                        objectFit="cover"
                                        width="100%"
                                        height={140}
                                        alt={result.title || result.name}
                                    />
                                )}
                                <Card.Footer css={{ justifyItems: "flex-start" }}>
                                    <Link to={`/${result.media_type === 'movie' ? 'movies' : result.media_type === 'tv' ? 'series' : 'actors'}/${result.id}`}>
                                        <Text b>{result.title || result.name}</Text>
                                    </Link>
                                </Card.Footer>
                            </Card>
                        </Grid>
                    ))}
                </Grid.Container>
            ) : null}
        </div>
    );
};

export default TmdbSearch;