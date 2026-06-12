// bookingUI.js – handles booking page interactions
// Uses global FLIGHT_DATA from FlightData.js

// Helper to pick a random flight from the dataset
function getRandomFlight() {
  const index = Math.floor(Math.random() * FLIGHT_DATA.length);
  return FLIGHT_DATA[index];
}

// Populate the summary card with a random featured flight
function loadFlightSummary() {
  const params = new URLSearchParams(window.location.search);
  const flightId = params.get('id');

  let flight = null;

  if (flightId) {
    flight = FLIGHT_DATA.find(f => f.id === flightId);
  }

  // Fallback to random if no ID or not found
  if (!flight) {
    flight = FLIGHT_DATA[Math.floor(Math.random() * FLIGHT_DATA.length)];
  }

  document.getElementById('s-id').textContent = flight.id;
  document.getElementById('s-airline').textContent = flight.airline;
  document.getElementById('s-origin').textContent = flight.origin;
  document.getElementById('s-destination').textContent = flight.destination;
  document.getElementById('s-date').textContent = flight.departDate;
  document.getElementById('s-depart').textContent = flight.departTime;
  document.getElementById('s-arrival').textContent = flight.arrivalTime;
  document.getElementById('s-duration').textContent = flight.duration;
  document.getElementById('s-class').textContent = flight.flightClass;
  document.getElementById('s-price').textContent = '$' + flight.price.toFixed(2);
}

// Validate booking form fields
function validateBookingForm(data) {
  const errors = [];
  // Simple non‑empty checks
  if (!data.firstname?.trim()) errors.push('First name is required.');
  if (!data.lastname?.trim()) errors.push('Last name is required.');
  if (!data.nationality?.trim()) errors.push('Nationality is required.');

  // Email format validation
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRegex.test(data.email || '')) errors.push('A valid email address is required.');

  // Phone validation – at least 6 characters
  if (!data.phone || data.phone.trim().length < 6) errors.push('Phone number must contain at least 6 characters.');

  // Passport validation – at least 5 characters
  if (!data.passport || data.passport.trim().length < 5) errors.push('Passport number must contain at least 5 characters.');

  // Date of birth – not empty and passenger at least 2 years old
  if (!data.dob) {
    errors.push('Date of birth is required.');
  } else {
    const birth = new Date(data.dob);
    const now = new Date();
    const age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (age < 2 || (age === 2 && m < 0)) {
      errors.push('Passenger must be at least 2 years old.');
    }
  }

  return errors.length ? { valid: false, errors } : { valid: true };
}

// Handle form submission
function handleBookingSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const data = {
    firstname: form['firstname'].value.trim(),
    lastname: form['lastname'].value.trim(),
    email: form['email'].value.trim(),
    phone: form['phone'].value.trim(),
    passport: form['passport'].value.trim(),
    dob: form['dob'].value,
    nationality: form['nationality'].value.trim(),
    cabin: form['cabin'].value,
    checked: form['checked'].value,
    meal: form['meal'].value,
    special: form['special'].value.trim(),
  };

  const validation = validateBookingForm(data);
  if (!validation.valid) {
    const container = document.getElementById('booking-errors');
    container.innerHTML = validation.errors.map(e => `<p class=search-error>${e}</p>`).join('');
    return;
  }

  document.getElementById('booking-errors').innerHTML = '';

  // Get flight summary values from the card
  const flightId = document.getElementById('s-id').textContent;
  const airline = document.getElementById('s-airline').textContent;
  const origin = document.getElementById('s-origin').textContent;
  const destination = document.getElementById('s-destination').textContent;
  const departDate = document.getElementById('s-date').textContent;
  const departTime = document.getElementById('s-depart').textContent;
  const arrivalTime = document.getElementById('s-arrival').textContent;
  const duration = document.getElementById('s-duration').textContent;
  const flightClass = document.getElementById('s-class').textContent;
  const price = document.getElementById('s-price').textContent;

  const templateParams = {
    flight_id: flightId,
    airline: airline,
    origin: origin,
    destination: destination,
    depart_date: departDate,
    depart_time: departTime,
    arrival_time: arrivalTime,
    duration: duration,
    flight_class: flightClass,
    price: price,
    passenger_name: data.firstname + ' ' + data.lastname,
    passenger_email: data.email,
    passenger_phone: data.phone,
    passport: data.passport,
    dob: data.dob,
    nationality: data.nationality,
    cabin_baggage: data.cabin,
    checked_baggage: data.checked

// Register event listeners once the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadFlightSummary();
  const form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', handleBookingSubmit);
  }
});
