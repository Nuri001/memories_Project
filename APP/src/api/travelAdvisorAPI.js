/* eslint-disable consistent-return */
import axios from 'axios';
var io = require('socket.io-client');




export const getPlacesData = async (type, sw, ne) => {
  try {

  var socket = io.connect('http://localhost:5000');
   socket.on('connect', function () { console.log("socket connected"); });
   socket.emit('search');
    
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'x-rapidapi-key': 'da694d2241msh25fb87204223d1cp129708jsn5c44ce22c7a0',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
        params: { lat, lon: lng },
        headers: {
          'x-rapidapi-key': 'da694d2241msh25fb87204223d1cp129708jsn5c44ce22c7a0',
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        },
      });

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
