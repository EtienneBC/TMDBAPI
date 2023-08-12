import React from 'react';
import { Button } from "@nextui-org/react";

function handleWatchlist(event, itemId, isSeries) {
  if (localStorage.getItem('isLogged') === 'true') {
    const watchlist = localStorage.getItem('Watchlist');
    const updatedWatchlist = watchlist ? `${watchlist},${itemId}:${isSeries ? 'series' : 'movie'}` : `${itemId}:${isSeries ? 'series' : 'movie'}`;
    localStorage.setItem('Watchlist', updatedWatchlist);
  }
}

function handleRemoveFromWatchlist(event, itemId, isSeries) {
  const watchlist = localStorage.getItem('Watchlist');
  if (watchlist) {
    const updatedWatchlist = watchlist
      .split(',')
      .filter((item) => item !== `${itemId}:${isSeries ? 'series' : 'movie'}`)
      .join(',');
    localStorage.setItem('Watchlist', updatedWatchlist);
  }
}

function WatchlistButton({ itemId, toWatch, mediaType }) {
  const isLogged = localStorage.getItem('isLogged');
  if (!isLogged) {
    return null;
  }

  const isSeries = mediaType === 'tv';
  const watchlist = localStorage.getItem('Watchlist');
  const isInWatchlist = watchlist && watchlist.includes(`${itemId}:${isSeries ? 'series' : 'movie'}`);

  return (
    <div>
      {isInWatchlist ? (
        <Button auto onPress={(event) => handleRemoveFromWatchlist(event, itemId, isSeries)}>
          Remove
        </Button>
      ) : (
        <Button auto onPress={(event) => handleWatchlist(event, itemId, isSeries)}>
          Add
        </Button>
      )}
    </div>
  );
}

export default WatchlistButton;
