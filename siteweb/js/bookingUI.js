// Redirect to flights.html if no flight ID in URL
(function() {
  const params = new URLSearchParams(window.location.search);
  if (!params.get('id')) {
    window.location.href = 'flights.html';
  }
})();

// bookingUI.js
function loadFlightSummary() {
  const params = new URLSearchParams(window.location.search);
  const flightId = params.get('id');
  let flight = null;
  if (flightId) flight = FLIGHT_DATA.find(f => f.id === flightId);
  if (!flight) flight = FLIGHT_DATA[Math.floor(Math.random() * FLIGHT_DATA.length)];
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
function validateBookingForm(data) {
  const errors = [];
  if (!data.firstname) errors.push('Le prenom est requis.');
  if (!data.lastname) errors.push('Le nom est requis.');
  if (!data.email || !/^[^@]+@[^@]+\.[^@]+$/.test(data.email)) errors.push('Email invalide.');
  if (!data.phone || data.phone.length < 6) errors.push('Telephone invalide.');
  if (!data.passport || data.passport.length < 5) errors.push('Passeport invalide.');
  if (!data.dob) errors.push('Date de naissance requise.');
  if (!data.nationality) errors.push('Nationalite requise.');
  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}
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
    document.getElementById('booking-errors').innerHTML = validation.errors.map(e => '<p class=search-error>' + e + '</p>').join('');
    return;
  }
  document.getElementById('booking-errors').innerHTML = '';
  const templateParams = {
    flight_id: document.getElementById('s-id').textContent,
    airline: document.getElementById('s-airline').textContent,
    origin: document.getElementById('s-origin').textContent,
    destination: document.getElementById('s-destination').textContent,
    depart_date: document.getElementById('s-date').textContent,
    depart_time: document.getElementById('s-depart').textContent,
    arrival_time: document.getElementById('s-arrival').textContent,
    duration: document.getElementById('s-duration').textContent,
    flight_class: document.getElementById('s-class').textContent,
    price: document.getElementById('s-price').textContent,
    passenger_name: data.firstname + ' ' + data.lastname,
    name: data.firstname + ' ' + data.lastname,
    email: data.email,
    passenger_email: data.email,
    passenger_phone: data.phone,
    passport: data.passport,
    dob: data.dob,
    nationality: data.nationality,
    cabin_baggage: data.cabin,
    checked_baggage: data.checked,
    meal: data.meal,
    special_requests: data.special || 'Aucune',
  };
  emailjs.init('UqeLjks1TM-tmkwFu');
  emailjs.send('service_rmfm8fc', 'template_iu850i6', templateParams)
    .then(() => {
      const toast = document.getElementById('booking-toast');
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
      form.reset();
      loadFlightSummary();
    })
    .catch((error) => {
      document.getElementById('booking-errors').innerHTML = '<p class=search-error>Erreur envoi email.</p>';
      console.error('EmailJS error:', error);
    });
}
document.addEventListener('DOMContentLoaded', () => {
  loadFlightSummary();
  document.getElementById('bookingForm').addEventListener('submit', handleBookingSubmit);
});
