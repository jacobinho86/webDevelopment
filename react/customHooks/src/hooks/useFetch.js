/*the rule in REACT is that functions that start with "use" are treated as hooks */

import { useEffect, useState } from "react";

export function useFetch(fetchFunction, initialValue) {

    const [isFetching, setIsFetching] = useState();
    const [error, setError] = useState();
    const [fetchData, setFetchData] = useState(initialValue);

    useEffect(() => {
        async function fetchData() {
          setIsFetching(true);
          try {
            const data = await fetchFunction();
            setFetchData(data);
          } catch (error) {
            setError({ message: error.message || 'Failed to fetch data...' });
          }
    
          setIsFetching(false);
        }
    
        fetchData();
      }, [fetchFunction]);

    return {isFetching, fetchData, error, setFetchData};
}