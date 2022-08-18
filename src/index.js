import './css/styles.css';
var debounce = require('lodash.debounce');
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
function onSearch(e) {
  e.preventDefault();
  // const form = e.currentTarget;
  const searchInput = input.value.trim();
  fetchCountries(searchInput).then(checkData).catch(showError);
}
//  Функции для markup -----------//
function createInfoMarkup() {
  return `<li>
  ${'flags.svg'} ${'name'}
</li>`;
}
function checkData(data) {
  if (data.length > 10) {
    console.log('Too many matches found. Please enter a more specific name.');
  } else if (data.length === 0) {
    console.log('Oops, there is no country with that name');
  } else if (data.length >= 2 && data.length <= 10) {
    console.log('render list');
  } else if (data.length === 1) {
    console.log('render 1 country');
  }
}
function renderCountry(country) {
  const markup = createInfoMarkup(country);
  countryList.insertAdjacentHTML('beforebegin', createInfoMarkup());
}
function showError(error) {
  console.log(error);
}
input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
