function fetchCountry(name) {
  const URL = 'https://restcountries.com/v3.1/name/';

  fetch(`${URL}/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.log('ошибка!');
    });
}

export { fetchCountry };
