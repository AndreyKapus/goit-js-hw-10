import './css/styles.css';
var debounce = require('lodash.debounce');
import { fetchCountry } from './fetchCountries';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const searchInput = input.value;

  fetchCountry(searchInput)
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

// function renderCountry(country) {
//   const markup = createInfoMarkup(country).map(country => {
//     return `<li>
//     ${'flags.svg'} ${'name'}
//   </li>`;
//   });
//   countryList.insertAdjacentHTML('beforebegin', markup);
// }
