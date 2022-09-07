import React from 'react'
import { UilSearchAlt, UilLocationArrow } from '@iconscout/react-unicons'   
import { useState } from 'react'


function Inputs({setQuery, units, setUnits, isLoading}) {
  const [city, setCity] = useState('')

  const handleSearch = (event) => {
    event.preventDefault()
    if (city !== '') setQuery({q: city})
  }

  const handleChange = event => {
    const result = event.target.value.replace(/[^a-z- ]/gi, '');

    setCity(result);
  };


  const handleLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((positon) => {
        let lat = positon.coords.latitude
        let lon = positon.coords.longitude

        setQuery({
          lat,
          lon,
        })
      })
    }
  }

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name
    if(units !== selectedUnit) setUnits(selectedUnit)
  }

  return (
    <div className='flex flex-row justify-center my-6'>

      <div className='flex flex-row w-1/4 sm:w-2/4 items-center justify-center space-x-4'>
        <form className='flex justify-center items-center' onSubmit={handleSearch}>
        <input type='text' value={city} onChange={handleChange} placeholder='search for city...' className='mr-1 text-xl sm:text-sm font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'/>
        <UilSearchAlt onClick={handleSearch} size={25} className='text-white cursor-pointer transition ease-out hover:scale-125'/>
        </form>
        <UilLocationArrow onClick={handleLocation} size={25} className='text-white cursor-pointer transition ease-out hover:scale-125'/>
      
      </div>

      <div className='flex flex-row w-1/4 items-center justify-center'>
        <button onClick={handleUnitsChange} name='metric' className='text-xl text-white font-light hover:scale-125 transition ease-out'>°C</button>
        <p className='text-xl text-white mx-1'>|</p>
        <button onClick={handleUnitsChange}  name='imperial' className='text-xl text-white font-light hover:scale-125 transition ease-out'>°F</button>
      </div>

    </div>
  )
}

export default Inputs