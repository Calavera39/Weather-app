
import './App.css';

import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocal from './components/TimeAndLocal';
import TempAndDits from './components/TempAndDits';
import Forecast from './components/Forecast';
import LoadingSpin from "react-loading-spin";

import getFormattedWeatherData from './services/weatherService';
import { useState, useEffect } from 'react';

function App() {

  const [query, setQuery] = useState({q: 'lipetsk'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(false)



 


  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true)
      const data = await getFormattedWeatherData({...query, units}).then(data => {
        setWeather(data)
        setIsLoading(false)
        console.log(data)
      })
      
    }
  
    fetchWeather();
  }, [query, units])

  useEffect(() => {
    alert('Weather API stopped being available in Russia. Please use VPN')
  }, [])
  
  const weth = weather && (
    <div>
      <TimeAndLocal weather={weather}/>
      <TempAndDits weather={weather}/>
      <Forecast items={weather.hourly} title='hourly forecast'/>
      <Forecast items={weather.daily}   title='daily forecast'/>
    </div>
  )


  return (
    <div className={`min-h-full sm:h-[110vh] mx-auto max-w-screen-md mt-0 py-5 px-32 sm:px-2 bg-gradient-to-br from-cyan-700 to-blue-700 shadow-xl shadow-gray-400`}>
      <TopButtons setQuery={setQuery}/>
      
      <Inputs  setQuery={setQuery} units={units} setUnits={setUnits}/>

      {isLoading ? <LoadingSpin /> : weth}

      

      
    </div> 
    
  );
}

export default App;
