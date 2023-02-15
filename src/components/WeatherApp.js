import axios from "axios";
import { useState } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const WeatherApp = () => {

  const [weatherCityInput, setWeatherCityInput] = useState();

  const [loading, setLoading] = useState();
  const [showOutputDiv, setShowOutputDiv] = useState();

  const [location, setLocation] = useState();
  const [weatherTemperature, setWeatherTemperature] = useState();
  const [humidity, setHumidity] = useState();
  const [country, setCountry] = useState();


  const onSubmitForm = async (e) => {

    e.preventDefault();


    const lettersOnlyRegex = /^[a-zA-Z\s]+$/;

    if (!weatherCityInput) {

      setLoading(false);
      
      setShowOutputDiv(false);

      Notify.failure('Please enter something in input field', { position: 'center-center', timeout: 4000 });


    } else if (!weatherCityInput.match(lettersOnlyRegex)) {

      setLoading(false);
      
      setShowOutputDiv(false);

      Notify.failure('Only letters are accepted as input.', { position: 'center-center', timeout: 6000 });

    } else {

      try {

        setShowOutputDiv(false);

        setLoading(true);

        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/predictweather`, { weatherInput: weatherCityInput });

        setLocation(data.data.name);

        setWeatherTemperature(data.data.main.feels_like);

        setHumidity(data.data.main.humidity);

        setCountry(data.data.sys.country)

        Notify.success(`weather of ${weatherCityInput} fetched successfully`, { position: 'center-center', timeout: 4000 });

        setLoading(false);

        setShowOutputDiv(true);

      } catch (error) {

        console.log(error);

        Notify.failure(error.response.data.message, { position: 'center-center', timeout: 6000 });

        setLoading(false);

        setShowOutputDiv(false);

      }
    }

  }

  return (
    <div className="w-4/5 lg:w-2/5">

      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="enter the name of the city"
          className="w-full p-3 outline-none border-none shadow-lg"
          onChange={(e) => setWeatherCityInput(e.target.value)}
        />
        {loading ? <button
          className="mt-8 w-full tracking-wider uppercase text-lg bg-pink-200 p-2 rounded-lg text-white outline-none border-none shadow-lg font-bold hover:cursor-not-allowed"
          disabled={true}
        >Get Weather</button> : <button
          className="mt-8 w-full tracking-wider uppercase text-lg bg-pink-400 p-2 rounded-lg text-white outline-none border-none shadow-lg font-bold transition-all duration-500 hover:bg-pink-500"
        >Get Weather</button>}
      </form>

      {loading ?
        <div>
          <p className="mt-14 text-center text-2xl font-bold uppercase"> <i className="fa-solid fa-sun animate-spin"></i> <span className="tracking-wider font-mono">Loading...</span> </p>
        </div>
        : showOutputDiv && <div className="mt-14 flex items-center justify-center flex-col gap-5 p-7 bg-slate-200 border-none outline-none rounded-lg shadow-lg">
          <p className="text-xl lg:text-2xl font-semibold text-center"><span className="tracking-wide">Location Name:</span> <span className="capitalize tracking-wide">{location}</span> </p>
          <p className="text-xl lg:text-2xl font-semibold text-center"> <span className="tracking-wide">Temperature:</span> <span className="tracking-wide">{weatherTemperature} &deg;C</span> </p>
          <p className="text-xl lg:text-2xl font-semibold text-center"> <span className="tracking-wide">Humidity:</span> <span className="tracking-wide">{humidity}</span> </p>
          <p className="text-xl lg:text-2xl font-semibold text-center"> <span className="tracking-wide">Country:</span> <span className="tracking-wide">{country}</span> </p>
        </div>
      }

    </div>
  )
};

export default WeatherApp;
