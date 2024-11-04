import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';

interface WeatherData {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    condition: {
        text: string;
        icon: string;
    };
}

const Weather: React.FC<{ city: string }> = ({ city }) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `https://api.weatherapi.com/v1/current.json?key=7df8d791b35346e2b9f61407240411&q=${city}&aqi=no`
                );
                setWeather(response.data.current);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='m-0 p-2 px-3 weatherBox col-3'>
            {weather ? (
                <>
                    <Row className='m-0 p-0 d-flex align-items-center justify-content-between'>
                        <h3 className='m-0 p-0 col-6  text-danger '>{weather.temp_c ?? "N/A"}°C</h3>
                        <Col className='m-0 p-0 col-3 pe-4'>
                            <img className='m-0 p-0' width={'64px'} height={'64px'} alt={weather.condition.text} src={weather.condition.icon} />
                        </Col>
                    </Row>
                    <Row className='m-0 p-0 d-flex align-items-center justify-content-between'>
                        <span className='m-0 p-0 col-4 '>{weather.condition.text ?? "N/A"}</span>
                        <span className='m-0 p-0 col-8 text-end'><span className='m-0 p-0 text-danger'> Humidity : </span> {weather.humidity ?? "N/A"}%</span>
                    </Row>
                    <p className='m-0 p-0 pt-2'><span className='m-0 p-0 text-danger'>Wind Speed : </span>{weather.wind_kph ?? "N/A"} kph</p>
                </>
            ) : (
                <p>Weather data is unavailable</p>
            )}
        </div>
    );
};

export default Weather;
