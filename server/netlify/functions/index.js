require('dotenv').config();
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const cors = require('cors');
const Amadeus = require('amadeus');
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
// Ejemplo de búsqueda de vuelos baratos en un rango de fechas
const origin = 'SDQ'; // Origen
const destination = 'MDE'; // Destino
const startDate = '2025-02-15'; // Fecha de inicio del rango
const endDate = '2025-02-30'; // Fecha de fin del rango
const maxPrice = 700; // Precio máximo
const maxDuration = 15; // Duración máxima en horas
const isDirect = false; // Preferencia por vuelos directos
const prefHours = { start: 0, end: 24 }; // Horario preferido (entre 6 AM y 10 PM)


// Configura el cliente de Amadeus con tus credenciales
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
  hostname:'production'
});


router.get(`/api/citySearch`, async (req, res) => { 
  
  let keywords = req.query.keyword; 
  const response = await amadeus.referenceData.locations
    .get({ 
      keyword: keywords, 
      subType: "AIRPORT", 
    }).catch((x) => res.json(x)); 
    try { 
      await res.json(response.data); 
    } catch (err) { 
    await res.json(err); 
  } 
});

router.get('/api/cheapestflight', async (req, res) => {

  await findCheapestFlightInRange(
    origin,
    destination,
    startDate,
    endDate,
    maxPrice,
    maxDuration,
    isDirect,
    prefHours
  ).then(cheapestFlight => {
    console.log('Vuelo más barato:', {
      offerId: cheapestFlight.offerId,
      airline: cheapestFlight.airline,
      origin: cheapestFlight.origin,
      destination: cheapestFlight.destination,
      departureDate: cheapestFlight.departureDate,
      duration: cheapestFlight.duration,
      price: cheapestFlight.price.total
    })
  });
})

router.post('/api/flights', async (req, res) => {
const content = req.body
     const origin = await content.data.from.iataCode;
   const destination = await content.data.to.iataCode;
   const departure = await content.data.departure_date;
   const return_date = await content.data.return_date;
    const response = await amadeus.shopping.flightOffersSearch.get({
      currencyCode: "USD",
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departure,
      returnDate: return_date, 
      travelClass: 'PREMIUM_ECONOMY',      // Clase de viaje (opcional)
      nonStop: false, //Si se establece en true solo buscara vuelos sin paradas!
      adults: 1,
    })
    .catch((err) => console.log(err));
    try {
      await res.json(JSON.parse(response.body));
      console.log(response.body);
    } catch (err) {
      await res.json(err);
    }
  });

  router.post("/flightprice", async function (req, res) {
    res.json(req.body);
    inputFlight = req.body;
    console.log(req.body);
    const responsePricing = await amadeus.shopping.flightOffers.pricing
      .post(
        JSON.stringify({
          data: {
            type: "flight-offers-pricing",
            flightOffers: inputFlight,
          },
        })
      )
      .catch((err) => console.log(err));
    try {
      await res.json(JSON.parse(responsePricing.body));
    } catch (err) {
      await res.json(err);
    }
  });




router.post('/api/bookflight', async (req, res) => {
 const response = await bookFlight(req, res)
    res.json(response.data)    
  })

// Función para buscar vuelos baratos con filtros adicionales
async function getFilteredFlights(origin, destination, departureDate, maxPrice, maxDuration, preferDirect, departureTimeWindow) {
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      currencyCode: "USD",
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departureDate,
      adults: 1,
      max: 15, // Aumentamos el número de resultados para tener más opciones
      
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

    // Filtro por ventana de tiempo de salida
    flights = flights.filter(flight => {
      const departureTime = new Date(flight.itineraries[0].segments[0].departure.at).getHours();
      return departureTime >= departureTimeWindow.start && departureTime <= departureTimeWindow.end;
    });
     console.log(`Vuelos encontrados para la fecha ${departureDate}:`);
    flights.forEach(flight => {
      console.log(`- Id: ${flight.id}`);
      console.log(`- Aerolínea: ${flight.itineraries[0].segments[0].carrierCode}`);
      console.log(`  Precio: ${flight.price.total} ${flight.price.currency}`);
      console.log(`  Origen: ${flight.itineraries[0].segments[0].departure.iataCode}`);
      console.log(`  Destino: ${flight.itineraries[0].segments[0].arrival.iataCode}`);
      console.log(`  Fecha de salida: ${flight.itineraries[0].segments[0].departure.at}`);
      console.log(`  Duración: ${flight.itineraries[0].duration}`);
      console.log('----------------------------------------');
    });
    // Transformar la data para mostrarla más fácilmente
    return flights.map(flight => {
      return {
        type: flight.type,
        id: flight.id,
        source: flight.source,
        instantTicketingRequired: false,
        nonHomogeneous: false,
        paymentCardRequired: false,
        travelers: flight.travelers,
        lastTicketingDate: flight.lastTicketing,
        itineraries: flight.itineraries,
        price: flight.price,
        validatingAirlineCodes: flight.validatingAirlineCodes,
        currency: flight.price.currency,
        origin: flight.itineraries[0].segments[0].departure.iataCode,
        destination: flight.itineraries[0].segments[0].arrival.iataCode,
        departureDate: flight.itineraries[0].segments[0].departure.at,
        duration: flight.itineraries[0].duration,
        airline: flight.itineraries[0].segments[0].carrierCode,
        offerId: flight.id,
        travelerPricings: flight.travelerPricings,
        segments: flight.itineraries[0].segments
      };
    });
  } catch (error) {
    console.error("Error al obtener vuelos:", error.response);
  }
}

// Función para generar un rango de fechas
function getDateRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dates.push(new Date(currentDate).toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

// Función para analizar precios en varias fechas y escoger el más barato
async function findCheapestFlightInRange(origin, destination, startDate, endDate, maxPrice, maxDuration, preferDirect, departureTimeWindow) {
  const dates = getDateRange(startDate, endDate);
  let cheapestFlight = null;

  for (const date of dates) {
    const flights = await getFilteredFlights(origin, destination, date, maxPrice, maxDuration, preferDirect, departureTimeWindow);
    
    if (flights.length > 0) {
      const cheapestOnDate = flights.reduce((prev, current) => (parseFloat(prev.price.total) < parseFloat(current.price.total) ? prev : current));
      
      if (!cheapestFlight || parseFloat(cheapestOnDate.price.total) < parseFloat(cheapestFlight.price.total)) {
        cheapestFlight = cheapestOnDate;
      }
    } else {
      console.log(`No se encontraron vuelos para la fecha ${date}.`);
    }
  }

  return cheapestFlight ? cheapestFlight : 'No se encontraron vuelos en el rango de fechas especificado.';
}

// Función para reservar un vuelo
async function bookFlight(flights, passengerDetails) {
  try {
    const response = await amadeus.booking.flightOrders.post({
      "data": {
        "type": "flight-order",
        "flightOffers": [flights],
        "travelers": [
          {
            "id": "1",
            "dateOfBirth": passengerDetails.dateOfBirth,
            "name": {
              "firstName": passengerDetails.firstName,
              "lastName": passengerDetails.lastName
            },
            "gender": passengerDetails.gender,
            "contact": {
              "emailAddress": passengerDetails.email,
              "phones": [{
                "deviceType": "MOBILE",
                "countryCallingCode": "1", // Cambia según el código de país
                "number": passengerDetails.phone
              }]
            },
            "documents": [{
              "documentType": "PASSPORT",
              "birthPlace": passengerDetails.birthPlace,
              "issuanceLocation": passengerDetails.birthPlace,
              "issuanceDate": passengerDetails.issuanceDate,
              "number": passengerDetails.documentNumber,
              "expiryDate": passengerDetails.expiryDate,
              "issuanceCountry": passengerDetails.issuanceCountry,
              "validityCountry": passengerDetails.issuanceCountry,
              "nationality": passengerDetails.nationality,
              "holder": true
            }]
          }
        ],
        "remarks": {
          "general": [
            {
              "subType": "GENERAL_MISCELLANEOUS",
              "text": "ONLINE BOOKING FROM INCREIBLE VIAJES"
            }
          ]
        },
        "ticketingAgreement": {
          "option": "DELAY_TO_CANCEL",
          "delay": "6D"
        },
        "contacts": [
          {
            "addresseeName": {
              "firstName": "Victor Manuel",
              "lastName": "Morillo Howley"
            },
            "purpose": "STANDARD",
            "phones": [
              {
                "deviceType": "LANDLINE",
                "countryCallingCode": "34",
                "number": "480080071"
              },
              {
                "deviceType": "MOBILE",
                "countryCallingCode": "33",
                "number": "480080072"
              }
            ],
            "emailAddress": "vmhowleyh@gmail.com",
            "address": {
              "lines": ["Calle Prado, 16"],
              "postalCode": "28014",
              "cityName": "Madrid",
              "countryCode": "ES"
            }
          }
        ]
      }
    });

    console.log("Reserva ", response.data.id, 'Confirmada ✔');
    return (response.data)
  } catch (error) {
    console.error("Error al reservar el vuelo:", error.data);
    return ('Error al reservar el vuelo')
  }
}

// Función para consultar una orden de vuelo
async function getFlightOrder(flightOrderId) {
  try {
    const response = await amadeus.booking.flightOrder(flightOrderId).get();
    console.log('Detalles de la orden de vuelo:', response.data);
  } catch (error) {
    console.error('Error al consultar la orden de vuelo:', error.response ? error.response.data : error);
  }
}

// Función para cancelar una orden de vuelo
async function cancelFlightOrder(flightOrderId) {
  try {
    const response = await amadeus.booking.flightOrder(flightOrderId).delete();
    console.log('Orden de vuelo cancelada:', response.data);
  } catch (error) {
    console.error('Error al cancelar la orden de vuelo:', error.response ? error.response.data : error);
  }
}



// Buscar el vuelo más barato en el rango de fechas


app.listen(3000, () => {
  console.log('API Amadeus Flight Search listening on port 3000!');
})

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);

