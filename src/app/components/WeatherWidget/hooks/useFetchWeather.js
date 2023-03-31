import { useState, useEffect } from 'react';

const BASE_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
export default function useFetchWeather(
  key,
  { lat, long } = {}
) {
  const [state, setState] = useState({ error: null, data: null, loading: true });
  useEffect(() => {
    const fetchWeather = async () => {
      const url =
        `${BASE_API_URL}` +
        `?lat=${lat}` +
        `&lon=${long}` +
        `&appid=${key}` +
        `&units=imperial`;
      try {
        const response = await fetch(url);
        const result = await response.json();
        setState({ data: result, loading: false });
      } catch (e) {
        setState({ error: e, loading: false });
      }
    }
    fetchWeather();
  }, [key, lat, long]);

  const errorMsg =
    state.data?.error?.message || state.error?.message;

  const weatherData = state.data ? state.data : null;

  return [errorMsg, state.loading, weatherData];
}
