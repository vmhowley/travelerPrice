require('dotenv').config();
const Amadeus = require('amadeus');

// Configura el cliente de Amadeus con tus credenciales
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

// Función para buscar vuelos baratos con filtros adicionales
async function getFilteredFlights(origin, destination, departureDate, maxPrice, maxDuration, preferDirect, departureTimeWindow) {
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departureDate,
      adults: 1,
      max: 20 // Aumentamos el número de resultados para tener más opciones
    });

    let flights = response.data;

    // Filtro por precio máximo
    flights = flights.filter(flight => parseFloat(flight.price.total) <= maxPrice);

    // Filtro por duración máxima del vuelo
    flights = flights.filter(flight => {
      const duration = flight.itineraries[0].duration; // Duración del primer itinerario
      const durationHours = parseInt(duration.match(/\d+H/)[0].replace('H', '')); // Extraer horas de la duración
      return durationHours <= maxDuration;
    });

    // Filtro por vuelos directos o con escalas
    if (preferDirect) {
      flights = flights.filter(flight => flight.itineraries[0].segments.length === 1);
    }

    // Filtro por ventana de tiempo de salida (ejemplo: evitar vuelos muy temprano o muy tarde)
    flights = flights.filter(flight => {
      const departureTime = new Date(flight.itineraries[0].segments[0].departure.at).getHours();
      return departureTime >= departureTimeWindow.start && departureTime <= departureTimeWindow.end;
    });

    // Transformar la data para mostrarla más fácilmente
    return flights.map(flight => {
      return {
        price: flight.price.total,
        origin: flight.itineraries[0].segments[0].departure.iataCode,
        destination: flight.itineraries[0].segments[0].arrival.iataCode,
        departureDate: flight.itineraries[0].segments[0].departure.at,
        duration: flight.itineraries[0].duration,
        airline: flight.itineraries[0].segments[0].carrierCode
      };
    });
  } catch (error) {
    console.error("Error al obtener vuelos:", error.response ? error.response.data : error);
  }
}

// Ejemplo de búsqueda de vuelos baratos con filtros adicionales
getFilteredFlights(
  'SDQ', // Origen
  'JFK', // Destino
  '2024-11-10', // Fecha de salida
  500, // Precio máximo
  10, // Duración máxima en horas
  true, // Preferencia por vuelos directos
  { start: 6, end: 22 } // Horario preferido (entre 6 AM y 10 PM)
).then(flights => {
  console.log("Vuelos de Ida:", flights);
  
});
getFilteredFlights('JFK', // Origen
  'SDQ', // Destino
  '2024-11-15', // Fecha de salida
  500, // Precio máximo
  10, // Duración máxima en horas
  true, // Preferencia por vuelos directos
  { start: 6, end: 22 } // Horario preferido (entre 6 AM y 10 PM)
).then(flights => {
  console.log("Vuelos De Vuelta :", flights);
  
})
