import React, { useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import Globe from 'react-globe.gl';
import './App.css';

function App() {
  const globeEl = useRef();
  const countries = useRef([]);
  const [pointsData, setPointsData] = useState([]);
  const [topCountries, setTopCountries] = useState([]);

  let WS_URL;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    WS_URL = `ws://127.0.0.1:8000`;
  } else {
    WS_URL = 'wss://real-time-events.onrender.com';
  }
  const { lastJsonMessage } = useWebSocket(WS_URL);

  const CLEAR_EVENT_PERIOD = 5000;
  const TOP_COUNTRIES_INTERVAL = 15000;
  const TOP_COUNTRIES_PERIOD = 60000;

  useEffect(() => {
    if (lastJsonMessage) {
      setPointsData(current => [...current, {
        lat: lastJsonMessage.location.lat,
        lng: lastJsonMessage.location.lng,
        size: 0.4,
        color: '#E1CD29',
        created_at: lastJsonMessage.created_at
      }]);
      countries.current = [...countries.current, { country: lastJsonMessage.location.country, created_at: lastJsonMessage.created_at }];
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 6.0;  // rotate the globe at the rate of 1 rotation per 10 seconds.
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPointsData(current => current.filter(point =>
        (new Date(point.created_at)).getTime() + CLEAR_EVENT_PERIOD >= Date.now() // clear events after CLEAR_EVENT_PERIOD
      ));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const getTopCountries = () => {
    const counter = {};
    countries.current.forEach(lastUnlock => {
      if (lastUnlock.country) {
        if (counter[lastUnlock.country]) {
          counter[lastUnlock.country] += 1;
        } else {
          counter[lastUnlock.country] = 1;
        }
      }
    })
    const sortedCounter = Object.entries(counter).sort(([, a], [, b]) => b - a);

    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    setTopCountries(sortedCounter.slice(0, 3).map(el => {
      const country = el[0];
      return regionNames.of(country);
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      countries.current = countries.current.filter(country =>
        (new Date(country.created_at)).getTime() + TOP_COUNTRIES_PERIOD >= Date.now() // clear countries after TOP_COUNTRIES_PERIOD
      );
      getTopCountries();
    }, TOP_COUNTRIES_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return <>
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      pointsData={pointsData}
      pointAltitude="size"
      pointColor='color'
      ref={globeEl}
    />
    <section className="TopCountries">
      <h3>Top countries from last minute:</h3>
      <ul>
        {topCountries.map(topCountry => <li key={topCountry}>{topCountry}</li>)}
      </ul>
    </section>
  </>;
}

export default App;