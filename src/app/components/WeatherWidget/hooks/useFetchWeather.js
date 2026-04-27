import { useState, useEffect } from 'react';

const BASE_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
export default function useFetchWeather(
  key,
  { lat, long } = {}
) {
  const [state, setState] = useState({ error: null, data: null, loading: true });
  useEffect(() => {
    const fetchWeather = async () => {
      if (!key) {
        setState({ error: new Error('Weather currently unavailable'), data: null, loading: false });
        return;
      }

      const url =
        `${BASE_API_URL}` +
        `?lat=${lat}` +
        `&lon=${long}` +
        `&appid=${key}` +
        `&units=imperial`;
      try {
        const response = await fetch(url);
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result?.message || 'Weather currently unavailable');
        }
        setState({ data: result, error: null, loading: false });
      } catch (e) {
        setState({ error: e, data: null, loading: false });
      }
    }
    fetchWeather();
  }, [key, lat, long]);

  const errorMsg =
    state.data?.error?.message || state.data?.message || state.error?.message;

  const weatherData = state.data ? state.data : null;

  return [errorMsg, state.loading, weatherData];
}
