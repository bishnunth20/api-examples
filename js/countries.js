const loadCountries = () => {
  fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => displayCountries(data));
}
loadCountries();

const displayCountries = counties => {
  // for (const country of counties) {
  //     console.log(country);
  // }
  const countriesDiv = document.getElementById('countries');
  counties.forEach(country => {
      // console.log(country);
      const div = document.createElement('div');
      div.classList.add('country')
      div.innerHTML = `
          <h3>${country.name.common}</h3>
          <p>${country.capital}</p>
      `;
      countriesDiv.appendChild(div);
  });
}