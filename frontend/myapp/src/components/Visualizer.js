import React from "react";
import './Visualizer.css'
const Visualizer = ({ weather }) => {
    const { loading, error, data, forecast } = weather || {};

    const toDateFunction = () => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
        ];
        const WeekDays = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
        ];
        const currentDate = new Date();
        return `${WeekDays[currentDate.getDay()]}, ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    };

    if (loading) return <h3>Loading...</h3>;
    if (error) return <h3>City not found. Please try again.</h3>;

    return (
        <div>
            <center>
            
            {data && data.main && (
                <div  className="forecast-card1">
                 
                    <div className="city-name">
                        <h2>
                            {data.name}, <span>{data.sys.country}</span>
                        </h2>
                    </div>
                    <div className="date">
                        <span>{toDateFunction()}</span>
                    </div>
                    <div className="weather-info">
                        <img
                            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                            alt={data.weather[0].description}
                        />
                        <p className="temp">{Math.round(data.main.temp)}°C</p>
                        <p>{data.weather[0].description}</p>
                        <p>💧 Humidity: {data.main.humidity}%</p>
                        <p>🌬️ Wind Speed: {data.wind.speed} m/s</p>
                    </div>
                   
                </div>
            )}
            
            </center>
            {/* 🌤️ 5-Day Forecast Section */}
            {forecast && forecast.length > 0 && (
                <div className="forecast">
                    <h3>5-Day Forecast</h3>
                    <div className="forecast-horizontal">
                        {forecast.map((day, idx) => (
                            <div key={idx} className="forecast-card">
                                <p className="forecast-date">
                                    {new Date(day.dt_txt).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </p>
                                <div className="forecast-details">
                                    <img
                                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                        alt={day.weather[0].description}
                                    />
                                    <div>
                                        <p className="forecast-temp">{Math.round(day.main.temp)}°C</p>
                                        <p className="forecast-desc">{day.weather[0].description}</p>
                                        <p>💧Humidity {day.main.humidity}% <br/> 🌬️Wind Speed {day.wind.speed} m/s</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default Visualizer;
