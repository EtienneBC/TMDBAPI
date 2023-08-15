import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Image, Button, Text, Spacer, Card } from "@nextui-org/react"
import Nav from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const Watchlist = () => {
  const [watchlistData, setWatchlistData] = useState([]);

  useEffect(() => {
    const fetchWatchlistData = async () => {
      // Retrieve the watchlist data from localStorage
      const watchlistString = localStorage.getItem('Watchlist');

      // Parse the data into an array of objects
      if (watchlistString) {
        const watchlistArray = watchlistString.split(',').map(async item => {
          const [id, type] = item.split(':');
          const itemDetails = await fetchItemDetails(id, type);
          return { ...itemDetails, type };
        });

        Promise.all(watchlistArray).then(updatedWatchlist => {
          setWatchlistData(updatedWatchlist);
        });
      }
    };

    fetchWatchlistData();
  }, []);


  const fetchItemDetails = async (id, type) => {
    const apiKey = '72eaf7b03201f089b626e3c6c35a2eed';
    const baseUrl = 'https://api.themoviedb.org/3';
    const endpoint = type === 'movie' ? 'movie' : 'tv';
    const response = await fetch(`${baseUrl}/${endpoint}/${id}?api_key=${apiKey}`);

    if (!response.ok) {
      console.error('Error fetching item details:', response.statusText);
      return { id };
    }

    const data = await response.json();

    // You can modify the returned data as per your requirements.
    return {
      id: data.id,
      title: data.title || data.name,
      posterPath: data.poster_path,
      overview: data.overview,
      releaseDate: data.release_date || data.first_air_date,
      // Add more properties based on the data you want to display.
    };
  };
  const handleRemoveFromWatchlist = (itemId) => {
    const updatedWatchlist = watchlistData.filter(item => item.id !== itemId);
    setWatchlistData(updatedWatchlist);

    // Update the watchlist in localStorage after removal
    const updatedWatchlistString = updatedWatchlist
      .map(item => `${item.id}:${item.type}`)
      .join(',');

    localStorage.setItem('Watchlist', updatedWatchlistString);
  };


  const renderWatchlist = () => {
    if (watchlistData.length === 0) {
      return <p>Your watchlist is empty.</p>;
    }

    return (
      <div>
        {watchlistData.map((item, index) => (
          <div key={index}>
            <Card css={{ maxWidth: "1100px", maxHeight: "330px", margin: "auto", border: "0" }}>
              <Grid.Container gap={2} css={{ background: "#0C1E3C" }}>
                <Grid >
                  <Card css={{ border: "0" }}>
                    <Image src={`https://image.tmdb.org/t/p/w200${item.posterPath}`} alt={item.title} />
                  </Card>
                </Grid>
                <Grid xs={6} css={{ background: "#0C1E3C", display: "block!important" }}>
                  <Text>
                    {item.type === 'movie' ? 'Movie' : 'Serie'}
                  </Text>
                  <Text h3 className='title'>
                    <Link to={`/movies/${item.id}`}>{item.title}</Link>
                    <Link to={`/series/${item.id}`}>{item.name}</Link>
                  </Text>
                  <Spacer y={1} />
                  <Text>Release Date: {item.releaseDate}</Text>
                  <Text className='line-clamp '>Overview: {item.overview}</Text>
                  <Spacer y={0.5} />
                  <Button onClick={() => handleRemoveFromWatchlist(item.id)}>Remove</Button>
                </Grid>
              </Grid.Container>
            </Card>
            <Spacer></Spacer>
          </div>
        ))
        }
      </div>
    );
  };

  return (
    <div>
      <Nav></Nav>
      <Text
        h2
        css={{ width: "90%", margin: "auto", marginTop: "2rem", marginBottom: "2rem" }}
      >
        Watchlist
      </Text>
      {renderWatchlist()}
      <Footer />
    </div>
  );
};

export default Watchlist;


