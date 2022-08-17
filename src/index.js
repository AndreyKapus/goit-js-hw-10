import './css/styles.css';
var debounce = require('lodash.debounce');
import API from './fetchCountries';

const DEBOUNCE_DELAY = 300;

// Наити рефы///
const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');

const inputValue = input.addEventListener('input', onSearch);

function onSearch(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const searchInput = form.value;

  API.fetchCountry(searchInput)
    .then(renderCountry)
    .catch(error => {
      console.log('error');
    });
}

//  Функции для markup -----------//

function createInfoMarkup() {
  return `<li>
  ${'flags.svg'} ${'name'}
</li>`;
}

function renderCountry(country) {
  const markup = createInfoMarkup(country);
  countryList.insertAdjacentHTML('beforebegin', createInfoMarkup());
}
