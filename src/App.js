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
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [count, setCount] = useState(10);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');
  const [userProfile, setUserProfile] = useState({});

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

  const handleOpenProfile = (profileData) => {
    setUserProfile(profileData);
  };

  return (
    <>
      {status === 'ERROR' && <div>{'Something went wrong ...'}</div>}
      {status === 'LOADING' && <div>{'Loading profiles ...'}</div>}
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
