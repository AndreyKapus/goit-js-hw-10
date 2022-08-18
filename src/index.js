import './css/styles.css';
var debounce = require('lodash.debounce');
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function onSearch(e) {
  e.preventDefault();
  // const form = e.currentTarget;
  const searchInput = input.value.trim();
  fetchCountries(searchInput).then(checkData).catch(showError);
  // .finally(() => countryList.reset());
  if (searchInput === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
}

//  Функции для markup -----------//

function checkData(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    console.log('Too many matches found. Please enter a more specific name.');
  } else if (data.length === 0) {
    console.log('Oops, there is no country with that name');
  } else if (data.length >= 2 && data.length <= 10) {
    ifSomeCountries(data);
    console.log('render list');
  } else if (data.length === 1) {
    oneCountry(data);
    countryList.innerHTML = '';
    console.log('render 1 country');
  }
}

function oneCountry(data) {
  const info = data
    .map(({ name, capital, population, flags, languages }) => {
      return `
  <h1><img style="width: 30px; margin-right: 20px" src="${flags.svg}">${
        name.official
      }</h1>
  <p><span>Capital: </span>${capital}</p>
  <p><span>Population: </span>${population}</p>
  <p><span>Languages: </span>${Object.values(languages)}</p>`;
    })
    .join('');

  countryInfo.insertAdjacentHTML('beforeend', info);
}

function ifSomeCountries(data) {
  const markup = data
    .map(({ name, flags }) => {
      return `
       <li><p><img style="width: 30px; margin-right: 20px" src="${flags.svg}">${name.official}</p></li>`;
    })
    .join('');

  countryList.insertAdjacentHTML('beforeend', markup);
}

function showError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
