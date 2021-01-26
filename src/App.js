import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import SearchPage from './components/SearchPage';
import ProfilesContextProvider from './components/ProfilesContextProvider';
import ProfileDetails from './components/ProfileDetails';
import useInterval from './hooks/useInterval';
import './styles.css';

function App() {
  const PROFILES_URL =
    'https://randomuser.me/api/?results=12&nat=us,&inc=name,location,dob,id,picture&noinfo';
  const REFRESH_INTERVAL = 10; // In seconds
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [count, setCount] = useState(REFRESH_INTERVAL);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');
  const [userProfile, setUserProfile] = useState(null);

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
        setCount(REFRESH_INTERVAL);
      }
    },
    autoRefresh ? 1000 : null
  );

  // Toggles the autoRefresh state to true/false based on the switch in the SearchPage
  // If autoRefresh is false we stop the timer and reset the counter to 10 seconds
  const handleRefreshState = useCallback((value) => {
    setAutoRefresh(value);
    setCount(REFRESH_INTERVAL);
  });

  // Sets the userProfile state based on the profile card that is clicked in the SearchPage
  const handleOpenProfile = (profileData) => {
    setUserProfile(profileData);
  };

  return (
    <>
      {status === 'ERROR' && <h3>{'Error: Could not retrieve profile data'}</h3>}
      {status === 'LOADING' && <p>{'Loading profiles ...'}</p>}
      {status === 'LOADED' && (
        <ProfilesContextProvider profileData={data}>
          <Router>
            <Switch>
              <Route path="/profile">
                <ProfileDetails data={userProfile} />
              </Route>
              <Route path="/">
                <SearchPage
                  autoRefresh={autoRefresh}
                  openProfile={handleOpenProfile}
                  timer={count}
                  toggleRefresh={handleRefreshState}
                />
              </Route>
            </Switch>
          </Router>
        </ProfilesContextProvider>
      )}
    </>
  );
}

export default App;
