import React from 'react'

const Visalizer = ({ weather }) => {


    const toDateFunction = () => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
        ];
        const WeekDays = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
        ];
        const currentDate = new Date();
        return `${WeekDays[currentDate.getDay()]}, ${currentDate.getDate()} ${months[currentDate.getMonth()]
            }`;
    };
    return (
        <div>
            {weather.loading && <h3>Loading...</h3>}
            {weather.error && <h3>City not found. Please try again.</h3>}

            {weather && weather.data && weather.data.main && (
                <div>
                    <div className="city-name">
                        <h2>
                            {weather.data.name}, <span>{weather.data.sys.country}</span>
                        </h2>
                    </div>
                    <div className="date">
                        <span>{toDateFunction()}</span>
                    </div>
                    <div className="weather-info">
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                            alt={weather.data.weather[0].description}
                        />
                        <p className="temp">{Math.round(weather.data.main.temp)}°C</p>
                        <p>{weather.data.weather[0].description}</p>
                        <p>Humidity: {weather.data.main.humidity}%</p>
                        <p>Wind Speed: {weather.data.wind.speed} m/s</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Visalizer