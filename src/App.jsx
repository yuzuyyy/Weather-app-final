import { useEffect, useState } from 'react';
import {
  MapPin,
  Search,
  Wind,
  Droplets,
  Twitter,
  Github,
  Instagram,
  Facebook,
} from 'lucide-react';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Jakarta');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const location = weather?.name;
  const country = weather?.sys.country;
  const kondisiCuaca = weather?.weather[0].main.toLowerCase();
  const temp = Math.floor(weather?.main.temp);
  const desc = weather?.weather[0].description;
  const humidity = weather?.main.humidity;
  const wind = weather?.wind.speed;

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const api_key = 'f9f1e027cbeb395ce6fa7f1f389cb39e';
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
      const response = await fetch(api);
      const data = await response.json();
      console.log(data);
      console.log(country);

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
      }
    } catch {
      console.error('Error fetching weather data');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (city) fetchWeather();
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setCity(query.trim());
      setQuery('');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-400 to-pink-300 ">
      <div className="w-[300px] shadow-2xl rounded-xl overflow-hidden">
        {/* seacrh input start*/}
        <div className="flex items-center gap-2 px-6 py-4 bg-white/40 shadow backdrop-blur-xl cursor-pointer">
          <MapPin />
          <input
            className="h-full w-full border-none focus:border-blue-300 p-2 bg-transparent "
            placeholder="Search City"
            type="text"
            value={query.toUpperCase()}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Search className="cursor-pointer" onClick={handleSearch} />
        </div>
        {/* seacrh input end*/}

        {loading ? (
          <p className="text-center font-semibold">Loading....</p>
        ) : weather ? (
          <>
            <div className="flex flex-col gap-2 items-center p-8 bg-black/20 backdrop-blur-xl">
              <h1 className="text-3xl text-blue-200  font-medium text-center capitalize">
                {location}, <span>{country}</span>
              </h1>

              <img
                className="w-[200px] bounce"
                src={`/images/${kondisiCuaca}.png`}
                alt="img"
              />
              <p className="text-2xl capitalize font-medium text-center">
                {kondisiCuaca}
              </p>
              <p className="text-lg text-slate-600 capitalize">{desc}</p>
            </div>

            <div className="flex items-center bg-white/20 backdrop-blur-xl">
              <div className="flex items-center p-4 border-black gap-1">
                <Wind className="size-[20px] text-pink-400" />
                <p className="text-xl font-semibold">
                  Wind : <span className="text-pink-400">{wind}</span>{' '}
                  <span className="text-sm">m/s</span>
                </p>
              </div>

              <div className="flex items-center py-6 border-black gap-1">
                <Droplets className="size-[20px] text-blue-700" />
                <p className="text-xl font-semibold">
                  Humidity : <span className="text-blue-700">{humidity}</span>{' '}
                  <span className="text-sm">%</span>
                </p>
              </div>
            </div> 
          </>
        ) : (
          <div className="flex flex-col gap-4 p-4">
            <img src="public/images/404.png" alt=""/>
            <p className="text-center capitalize font-semibold">No data, Search another city</p>
          </div>
        )}
      </div>

      {/* Social media start */}
      <div className="w-[300px] h-[200px] bg-black/20 backdrop-lg mt-8 rounded-xl flex flex-col items-center justify-center shadow-xl gap-6 ">
        <h1 className="text-2xl capitalize">Follow me on :</h1>
        <div className="flex gap-4 bg-white/20 backdrop-lg p-6 rounded-xl">
          <Twitter className="hover:text-blue-700 transition-all ease-out animate-pulse" />
          <Github className="hover:text-blue-700 transition-all ease-out animate-pulse" />
          <Instagram className="hover:text-blue-700 transition-all ease-out animate-pulse" />
          <Facebook className="hover:text-blue-700 transition-all ease-out animate-pulse" />
        </div>

        <p>
          Copyright by <span className="text-lg font-bold">Hendz</span>{' '}
        </p>
      </div>
      {/* Social media end */}
    </div>
  );
};

export default App;
