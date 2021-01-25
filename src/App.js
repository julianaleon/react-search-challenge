import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchPage from './components/SearchPage';
import ProfilesContextProvider from './components/ProfilesContextProvider';
import './styles.css';

function App() {
  const PROFILES_URL =
    'https://randomuser.me/api/?results=12&nat=us,&inc=name,location,dob,id,picture&noinfo';
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setStatus('LOADING');

      try {
        const results = await axios(PROFILES_URL);

        setData(results.data.results);
        console.log(results.data.results);
      } catch (error) {
        setStatus('ERROR');
      }

      setStatus('LOADED');
    };

    fetchData();
  }, []);

  return (
    <>
      {status === 'ERROR' && <div>{'Something went wrong ...'}</div>}
      {status === 'LOADING' && <div>{'Loading profiles ...'}</div>}
      {status === 'LOADED' && (
        <ProfilesContextProvider profileData={data}>
          <SearchPage />
        </ProfilesContextProvider>
      )}
    </>
  );
}

export default App;
