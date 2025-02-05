import Places from './Places.jsx';
import Error from './Error.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces,setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {

    async function fetchPlaces() {
      setIsFetching(true);

      try {

        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
    
      }catch (error){
        console.log('entramos?');
        setError({message: error.message || "Could not fetch places, try again later..."});
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  if(error) {
    return <Error title="An error ocurred!" message={error.message}/>
  }

  return (
    <Places
      title="Available Places"
      loadingText= "Loading place data..."
      isLoading={isFetching}
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
