document.getElementById('flightForm').addEventListener('submit', async function(e) {
    e.preventDefault();
  
    // Obtener valores del formulario
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const maxDuration = document.getElementById('maxDuration').value;
    const direct = document.getElementById('direct').checked;
  
    // Limpiar resultados previos
    document.getElementById('flightResults').innerHTML = '';
  
    // Enviar datos al backend para buscar vuelos
    const response = await fetch('http://localhost:3000/api/findFlights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        origin, destination, startDate, endDate, maxPrice, maxDuration, direct
      })
    });
  
    const data = await response.json();
  
    if (data.cheapestFlight) {
      // Mostrar el vuelo más barato
      const flight = data.cheapestFlight;
      document.getElementById('flightResults').innerHTML = `
        <h2>Vuelo más barato encontrado:</h2>
        <p>Precio: $${flight.price}</p>
        <p>Salida: ${flight.departureDate}</p>
        <p>Duración: ${flight.duration}</p>
      `;
  
      // Renderizar botón de PayPal
      paypal.Buttons({
        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: flight.price
              }
            }]
          });
        },
        onApprove: function(data, actions) {
          return actions.order.capture().then(function(details) {
            alert('Pago realizado por ' + details.payer.name.given_name);
  
            // Enviar la solicitud para reservar el vuelo después del pago exitoso
            fetch('http://localhost:3000/api/bookFlight', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                flight,
                passengerDetails: {
                  firstName: 'Margaret Andreina',
                  lastName: 'Quezada Encarnacion',
                  dateOfBirth: "1997-12-25",
                  email: 'johndoe@gmail.com',
                  phone: '+1 234 567 8901',
                  birthPlace: 'DO',
                  issuanceCountry: 'US',
                  nationality: 'DO',
                  documentNumber: '5445465665446',
                  expiryDate: '2025-12-31',
                  issuanceDate: '2020-01-01'
                }
              })
            }).then(response => response.json())
            .then(data => {
              alert('Vuelo reservado con éxito!');
            });
          });
        }
      }).render('#paypal-button-container');
    } else {
      document.getElementById('flightResults').innerHTML = 'No se encontraron vuelos.';
    }
  });
  