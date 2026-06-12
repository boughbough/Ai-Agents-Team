// flightsTable.js – Manages the catalogue page (flights.html)
// Requires the global FLIGHT_DATA array from FlightData.js

const ROWS_PER_PAGE = 25;
let filteredFlights = [...FLIGHT_DATA];
let currentPage = 1;
let sortKey = 'departDate';
let sortDir = 'asc';

/* -------------------- Helpers -------------------- */
function parseDuration(str) {
  const h = str.match(/(\d+)h/);
  const m = str.match(/(\d+)m/);
  return (h ? parseInt(h[1], 10) * 60 : 0) + (m ? parseInt(m[1], 10) : 0);
}

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

/* -------------------- Filter Population -------------------- */
function populateFilters() {
  const origins = [...new Set(FLIGHT_DATA.map(f => f.origin))].sort();
  const destinations = [...new Set(FLIGHT_DATA.map(f => f.destination))].sort();
  const airlines = [...new Set(FLIGHT_DATA.map(f => f.airline))].sort();

  const originSelect = document.getElementById('f-origin');
  const destSelect = document.getElementById('f-destination');
  const airlineSelect = document.getElementById('f-airline');

  origins.forEach(o => {
    const opt = document.createElement('option');
    opt.value = o;
    opt.textContent = o;
    originSelect.appendChild(opt);
  });

  destinations.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = d;
    destSelect.appendChild(opt);
  });

  airlines.forEach(a => {
    const opt = document.createElement('option');
    opt.value = a;
    opt.textContent = a;
    airlineSelect.appendChild(opt);
  });

  // default date‑from = 2026‑01‑01 (the start date used when generating data)
  const dateFrom = document.getElementById('f-date-from');
  dateFrom.value = '2026-01-01';

  // Pre-fill destination from URL param
  const urlParams = new URLSearchParams(window.location.search);
  const destParam = urlParams.get('destination');
  if (destParam) {
    const destSelect = document.getElementById('f-destination');
    destSelect.value = destParam;
    // Trigger change event if needed
    const event = new Event('change');
    destSelect.dispatchEvent(event);
  }
}

/* -------------------- Filtering Logic -------------------- */
function applyFilters() {
  const origin = document.getElementById('f-origin').value;
  const destination = document.getElementById('f-destination').value;
  const airline = document.getElementById('f-airline').value;
  const fClass = document.getElementById('f-class').value;
  const dateFrom = document.getElementById('f-date-from').value;
  const dateTo = document.getElementById('f-date-to').value;
  const priceMax = document.getElementById('f-price-max').value;
  const durationMax = document.getElementById('f-duration').value;
  const seatsMin = document.getElementById('f-seats').value;

  filteredFlights = FLIGHT_DATA.filter(fl => {
    if (origin && fl.origin !== origin) return false;
    if (destination && fl.destination !== destination) return false;
    if (airline && fl.airline !== airline) return false;
    if (fClass && fl.flightClass !== fClass) return false;

    if (dateFrom && fl.departDate < dateFrom) return false;
    if (dateTo && fl.departDate > dateTo) return false;

    if (priceMax && fl.price > parseFloat(priceMax)) return false;

    if (durationMax) {
      const mins = parseDuration(fl.duration);
      if (mins > parseInt(durationMax, 10)) return false;
    }

    if (seatsMin && fl.seatsAvailable < parseInt(seatsMin, 10)) return false;

    return true;
  });

  currentPage = 1;
  renderTable();
  renderPagination();
  document.getElementById('results-count').textContent =
    `Showing ${filteredFlights.length} of ${FLIGHT_DATA.length} flights`;
}

/* -------------------- Table Rendering -------------------- */
function renderTable() {
  const tbody = document.getElementById('flights-tbody');
  tbody.innerHTML = '';

  const start = (currentPage - 1) * ROWS_PER_PAGE;
  const pageRows = filteredFlights.slice(start, start + ROWS_PER_PAGE);

  pageRows.forEach(flight => {
    const tr = document.createElement('tr');

    const badge = document.createElement('span');
    badge.className = `badge badge--${flight.flightClass}`;
    badge.textContent = flight.flightClass;

    const cells = [
      `<a href="booking.html?id=${flight.id}" class="button book-btn">Book</a>`,
      flight.id,
      flight.airline,
      flight.origin,
      flight.destination,
      flight.departDate,
      flight.departTime,
      flight.arrivalTime,
      flight.duration,
      badge.outerHTML,
      `<span class="price-cell">${formatPrice(flight.price)}</span>`,
      flight.seatsAvailable
    ];

    cells.forEach(c => {
      const td = document.createElement('td');
      td.innerHTML = c;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}

/* -------------------- Sorting -------------------- */
function sortFlights(key) {
  if (sortKey === key) {
    sortDir = sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey = key;
    sortDir = 'asc';
  }

  filteredFlights.sort((a, b) => {
    let valA = a[key];
    let valB = b[key];

    // special handling for duration strings
    if (key === 'duration') {
      valA = parseDuration(valA);
      valB = parseDuration(valB);
    }

    // numeric comparison where appropriate
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortDir === 'asc' ? valA - valB : valB - valA;
    }

    // dates are ISO strings, string compare works
    if (key === 'departDate') {
      return sortDir === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    // fallback to string compare (case‑insensitive)
    return sortDir === 'asc'
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  // update header classes
  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.classList.remove('sort-asc', 'sort-desc');
    if (th.dataset.sort === sortKey) {
      th.classList.add(sortDir === 'asc' ? 'sort-asc' : 'sort-desc');
    }
  });

  renderTable();
}

/* -------------------- Pagination -------------------- */
function renderPagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const totalPages = Math.ceil(filteredFlights.length / ROWS_PER_PAGE);
  if (totalPages <= 1) return;

  const createBtn = (label, page, disabled = false, extraClass = '') => {
    const btn = document.createElement('button');
    btn.textContent = label;
    if (extraClass) btn.classList.add(extraClass);
    if (disabled) btn.disabled = true;
    btn.addEventListener('click', () => goToPage(page));
    return btn;
  };

  // Prev arrow
  pagination.appendChild(
    createBtn('←', currentPage - 1, currentPage === 1, 'prev')
  );

  const maxButtons = 7;
  let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let end = Math.min(totalPages, start + maxButtons - 1);
  if (end - start < maxButtons - 1) {
    start = Math.max(1, end - maxButtons + 1);
  }

  for (let i = start; i <= end; i++) {
    const btn = createBtn(i, i, false, i === currentPage ? 'active' : '');
    pagination.appendChild(btn);
  }

  // Next arrow
  pagination.appendChild(
    createBtn('→', currentPage + 1, currentPage === totalPages, 'next')
  );
}

function goToPage(n) {
  const totalPages = Math.ceil(filteredFlights.length / ROWS_PER_PAGE);
  if (n < 1) n = 1;
  if (n > totalPages) n = totalPages;
  currentPage = n;
  renderTable();
  renderPagination();

  const section = document.getElementById('table-section');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

/* -------------------- Reset -------------------- */
function resetFilters() {
  document.getElementById('f-origin').value = '';
  document.getElementById('f-destination').value = '';
  document.getElementById('f-airline').value = '';
  document.getElementById('f-class').value = '';
  document.getElementById('f-date-from').value = '2026-01-01';
  document.getElementById('f-date-to').value = '';
  document.getElementById('f-price-max').value = '';
  document.getElementById('f-duration').value = '';
  document.getElementById('f-seats').value = '';

  filteredFlights = [...FLIGHT_DATA];
  currentPage = 1;
  renderTable();
  renderPagination();
  document.getElementById('results-count').textContent =
    `Showing ${filteredFlights.length} of ${FLIGHT_DATA.length} flights`;
}

/* -------------------- Event Listeners -------------------- */
document.addEventListener('DOMContentLoaded', () => {
  populateFilters();
  applyFilters(); // initial render

  document.getElementById('btn-apply').addEventListener('click', applyFilters);
  document.getElementById('btn-reset').addEventListener('click', resetFilters);

  // sorting on table headers
  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => sortFlights(th.dataset.sort));
  });
});
