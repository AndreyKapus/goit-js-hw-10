export function fetchCountry(name) {
  const URL = 'https://restcountries.com/v3.1/name/';
  const FILTER = '?fields=name,capital,population,flags,languages';
  fetch(`${URL}${'name'}${FILTER}`)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log('ошибка!');
    });
}
