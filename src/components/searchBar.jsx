import React, { useState, useEffect } from "react";
import { Collapse, Text, Grid, Checkbox, Radio, Button, Container, Image, Row, Col, Input, Spacer, Switch, Pagination } from "@nextui-org/react";
import { Link } from "react-router-dom";
import WatchlistButton from './WatchlistButton.jsx';
import VoteBar from "../hooks/VoteBar.jsx";

export default function SearchBar() {
    const [categories, setCategories] = useState([]);
    const [selectedSortOption, setSelectedSortOption] = useState("popularity.desc");
    const [selectedGenreOptions, setSelectedGenreOptions] = useState([]);
    const [selectedDecadeOption, setSelectedDecadeOption] = useState("");
    const [searchResults, setSearchResults] = useState([]); // Add searchResults state
    const [adult, setFilter] = useState(true);
    const handleFilterChange = (value) => {
        setFilter(value);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchMovieCategories = async () => {
            try {
                const response = await fetch(
                    "https://api.themoviedb.org/3/genre/movie/list?api_key=72eaf7b03201f089b626e3c6c35a2eed"
                );
                const data = await response.json();
                setCategories(data.genres);
            } catch (err) {
                console.log("Error fetching categories", err);
            }
        };

        fetchMovieCategories();
    }, []);

    const handleSearch = async () => {
        const decadeRange = selectedDecadeOption.split('-');
        const startYear = parseInt(decadeRange[0]);
        const endYear = parseInt(decadeRange[1]);
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/discover/movie?api_key=72eaf7b03201f089b626e3c6c35a2eed&sort_by=${selectedSortOption}&with_genres=${selectedGenreOptions}&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31&include_adult=${adult}&page=${currentPage}`
            );
            const data = await response.json();
            setSearchResults(data.results);
            setTotalPages(data.total_pages); // Store total pages
        } catch (error) {
            console.error("Error fetching movies", error);
        }
    };

    const handleSearchBar = async () => {
        if (searchText.trim() === '') {
            return; // Don't perform empty searches
        }

        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=72eaf7b03201f089b626e3c6c35a2eed&query=${encodeURIComponent(
                    searchText
                )}&page=${currentPage}`
            );
            const data = await response.json();
            setSearchResults(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error("Error fetching movies", error);
        }
    };
    const handlePaginationChange = async (newPage) => {
        setCurrentPage(newPage);
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/discover/movie?api_key=72eaf7b03201f089b626e3c6c35a2eed&sort_by=${selectedSortOption}&with_genres=${selectedGenreOptions}&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31&include_adult=${adult}&page=${newPage}`
            );
            const data = await response.json();
            setSearchResults(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error("Error fetching movies", error);
        }
    };
    const viewMenu = () => {
        const menu = document.querySelector(".leftSearch");
        
        menu.classList.toggle("active");

        // Toggle display based on screen width
        const screenWidth = window.innerWidth;
        if (screenWidth <= 1280) {
            menu.style.display = menu.classList.contains("active") ? "block" : "none";
        }
    };
    return (
        <Container responsive="true" >
            <Button className="viewMenu" auto onClick={viewMenu}>View menu</Button>
            <Spacer y={1} />
            <Row gap={1}>
                <Col className="leftSearch">
                    <Grid className="searchbar">
                        <Collapse.Group shadow>
                            <Collapse title="Search">
                                <Input
                                    placeholder="Search for a movie"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </Collapse>
                            <Spacer y={1} />
                            <Button onClick={handleSearchBar}>
                                Search
                            </Button>
                            <Spacer y={1} />
                        </Collapse.Group>
                        <h3>or</h3>
                        <Collapse.Group shadow>
                            <Collapse title="Sort">
                                <Radio.Group
                                    defaultValue="popularity.desc"
                                    value={selectedSortOption}
                                    onChange={(value) => setSelectedSortOption(value)}
                                >
                                    <Radio size="sm" value="popularity.asc">Popularity ascending</Radio>
                                    <Radio size="sm" value="popularity.desc">Popularity descending</Radio>
                                    <Radio size="sm" value="vote_average.desc">Score descending</Radio>
                                    <Radio size="sm" value="vote_average.asc">Score ascending</Radio>
                                    <Radio size="sm" value="primary_release_date.desc">Release date descending</Radio>
                                    <Radio size="sm" value="primary_release_date.asc">Release date ascending</Radio>
                                    <Radio size="sm" value="vote_count.asc">Vote count ascending</Radio>
                                    <Radio size="sm" value="vote_count.desc">Vote count descending</Radio>
                                </Radio.Group>
                            </Collapse>
                            <Collapse title="Genre">
                                {categories.map((category) => (
                                    <Checkbox
                                        size="sm"
                                        key={category.id}
                                        value={category.id}
                                        checked={selectedGenreOptions.includes(category.id)}
                                        onChange={(checked) =>
                                            setSelectedGenreOptions((prev) =>
                                                checked
                                                    ? [...prev, category.id]
                                                    : prev.filter((id) => id !== category.id)
                                            )
                                        }
                                    >
                                        {category.name}
                                    </Checkbox>
                                ))}
                            </Collapse>
                            <Collapse title="Decade">
                                <Radio.Group
                                    defaultValue="1940-2021"
                                    value={selectedDecadeOption}
                                    onChange={(value) => setSelectedDecadeOption(value)}
                                >
                                    <Radio size="sm" value="1940-2021">Any year</Radio>
                                    <Radio size="sm" value="2020-2030">2020s</Radio>
                                    <Radio size="sm" value="2010-2020">2010s</Radio>
                                    <Radio size="sm" value="2000-2010">2000s</Radio>
                                    <Radio size="sm" value="1990-2000">1990s</Radio>
                                    <Radio size="sm" value="1980-1990">1980s</Radio>
                                    <Radio size="sm" value="1970-1980">1970s</Radio>
                                    <Radio size="sm" value="1960-1970">1960s</Radio>
                                    <Radio size="sm" value="1950-1960">1950s</Radio>
                                    <Radio size="sm" value="1940-1950">1940s</Radio>
                                </Radio.Group>
                            </Collapse>
                            <Collapse title="Filter">
                                <Text>Include adult movies</Text>
                                <Switch initialChecked={adult} onChange={handleFilterChange} />
                            </Collapse>

                            <Spacer y={1} />
                            <Button onClick={handleSearch}>
                                Search
                            </Button>
                            <Spacer y={1} />
                        </Collapse.Group>
                    </Grid>
                </Col>
                <Col fluid>
                    <Text h3>Results</Text>
                    <Grid.Container gap={2} justify="center" width="fit-content">
                        {searchResults.map((item) => (
                            <Grid xs={12} sm={12} key={item.id} className="shadow-md" direction='row' css={{ maxHeight: "324px", background: "#0C1E3C", marginBottom: "10px", borderRadius: "15px" }}>
                                <Link to={`/movies/${item.id}`}>
                                    <Image
                                        showSkeleton={true}
                                        width={200}
                                        height={300}
                                        src={item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : 'https://site1.etiennecouture.ca/wp-content/uploads/2023/08/placeholder.png'}
                                        alt="Movie poster"
                                        css={{ borderRadius: "15px" }}
                                        maxDelay={1000}
                                    />
                                </Link>
                                <Container css={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                    <div>
                                        <Link to={`/movies/${item.id}`}>
                                            <Text
                                                h3
                                                className="oneLine">{item.title}</Text>
                                        </Link>
                                    </div>
                                    <div>
                                        <Text className="oneLine" p>{
                                            item.genre_ids.map((genre) => {
                                                const genreName = categories.find((category) => category.id === genre);
                                                return genreName.name;
                                            }).join(", ")
                                        }
                                        </Text>
                                        <Text p>{item.release_date}</Text>
                                    </div>
                                    <div>
                                        <Text p className="line-clamp">{item.overview}</Text>
                                    </div>
                                    <div>
                                        <WatchlistButton itemId={item.id} toWatch={item.title} mediaType={item.media_type} />
                                        <VoteBar itemId={item.vote_average}></VoteBar>
                                    </div>
                                </Container>
                            </Grid>
                        ))}
                        <Pagination total={totalPages} active={currentPage} onChange={handlePaginationChange} onClick={handleSearchBar} />
                    </Grid.Container>
                </Col>
            </Row>
        </Container>
    );
};