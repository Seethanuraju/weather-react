import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [tcity, setTcity] = useState('');
  const [temp, setTemp] = useState('');
  const [icon, setIcon] = useState('');
  const [wind, setWind] = useState('');
  const [humidity, setHumidity] = useState('');
  const [error, setError] = useState('');

  const checkweather = async () => {
    if (!city) {
      setError('Invalid city name');
      return;
    }
    setError('');
    await axios.get(`https://api.weatherapi.com/v1/current.json?key=ed1918c0fdb5408f80d94546253101&q=${city}`)
      .then((response) => {
        setTemp("Temperature :"+ response.data.current.temp_c + " °C");
        setIcon(response.data.current.condition.icon);
        setWind("Wind Speed :"+ response.data.current.wind_kph + " km/hr");
        setHumidity("Humidity :"+ response.data.current.humidity);
        setTcity(city);
      })
      .catch(() => {
        setError('Invalid city name');
      });
    setCity('');
  };

  return (
    <>
      <div className='main'>
        <div className='weather'>
          <h1>Check Weather</h1>
          <input type='text' placeholder='search for the city'
            value={city}
            onChange={(e) => { setCity(e.target.value);  
              setError('');
              setTemp('');
              setIcon('');
              setWind('');
              setHumidity('');
              setTcity('');
             }}
          ></input>
          <br />
          <button onClick={checkweather}>Get Details</button>
          {error && <p className='error'>{error}</p>}
          <h1>{tcity}</h1>
          {icon && <img src={icon} alt="weather icon" />}
          <h2>{temp}</h2>
          <h2>{humidity}</h2>
          <h2>{wind}</h2>
        </div>
      </div>
    </>
  );
}

export default App;