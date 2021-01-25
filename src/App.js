import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import SearchPage from './components/SearchPage';
import ProfilesContextProvider from './components/ProfilesContextProvider';
import useInterval from './hooks/useInterval';
import './styles.css';

function App() {
  const PROFILES_URL =
    'https://randomuser.me/api/?results=12&nat=us,&inc=name,location,dob,id,picture&noinfo';
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [count, setCount] = useState(10);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');

  const fetchData = async () => {
    setStatus('LOADING');

    try {
      const results = await axios(PROFILES_URL);

      setData(results.data.results);
    } catch (error) {
      setStatus('ERROR');
    }

    setStatus('LOADED');
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 10 second timer used to refetch profiles data
  useInterval(
    () => {
      if (count > 0) {
        setCount(count - 1);
      } else {
        fetchData();
        setCount(10);
      }
    },
    autoRefresh ? 1000 : null
  );

  const handleRefreshState = useCallback((value) => {
    setAutoRefresh(value);
    setCount(10); // Reset timer
  });

  return (
    <>
      {status === 'ERROR' && <div>{'Something went wrong ...'}</div>}
      {status === 'LOADING' && <div>{'Loading profiles ...'}</div>}
      {status === 'LOADED' && (
        <ProfilesContextProvider profileData={data}>
          <SearchPage autoRefresh={autoRefresh} timer={count} toggleRefresh={handleRefreshState} />
        </ProfilesContextProvider>
      )}
    </>
  );
}

export default App;
