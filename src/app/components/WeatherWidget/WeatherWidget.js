import React, { ReactElement } from 'react';
import useFetchWeather from './hooks/useFetchWeather';
import Image from 'next/image';

import styles from './WeatherWidget.module.css';

const ICON_BASE_URL = 'http://openweathermap.org/img/wn/';

function degreeToCardinal(degrees) {
  const cardinals = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
  const index = Math.round(degrees / 45) % 8;
  return cardinals[index];
}

function WeatherWidget({
  apiKey,
  geo = undefined,
}) {
  const [errorMsg, loading, weatherData] = useFetchWeather(
    apiKey,
    geo
  );

  if (loading) {
    return (
      <p
        style={{
          color: 'white',
          fontSize: '30px',
        }}
      >
        Loading...
      </p>
    );
  }

  if (errorMsg) {
    return (
      <p
        style={{
          color: 'white',
          fontSize: '30px',
        }}
      >
        {errorMsg}
      </p>
    );
  }

  return (
    <div className={styles.container}>
      <Image
        alt="weather-icon"
        src={`${ICON_BASE_URL + weatherData.weather[0].icon}@2x.png`}
        height={50}
        width={50}
      />
      <p>
        {Math.round(weatherData.main.temp)}°F |{' '}
        {weatherData.weather[0].description} | Wind: {weatherData.wind.speed}mph{' '}
        {degreeToCardinal(weatherData.wind.deg)} | Humidity:{' '}
        {weatherData.main.humidity}%
      </p>
      <a
        href="https://www.accuweather.com/en/us/taylorville/62568/weather-forecast/332746"
        target="blank"
      >
        View Pana&apos;s Satellite »
      </a>
    </div>
  );
}

export default WeatherWidget;
