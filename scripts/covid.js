let proxy = `https://api.allorigins.win/raw?url=`;
let proxy2 = `https://api.codetabs.com/v1/proxy/?quest=`;
// const countrySrc = `https://corona-api.com/countries`;
// const countrySrc = `https://restcountries.herokuapp.com/api/v1`;


async function allCountriesData(proxy) {

  let countryByname = [];
  let continent = {};

  const countrySrc = `${proxy}https://restcountries.herokuapp.com/api/v1`;
  const getdata = await fetch(countrySrc);
  let allCountries = await getdata.json();
  console.log(allCountries);

  for (country of allCountries) {
    countryByname.push([country.name.common, country.region]);
  }

  for (country of countryByname) {
    if (country[1] in continent) {
      continent[country[1]].push(country[0]);
    }
    else {
      continent[country[1]] = [country[0]];
    }
  }
  return [countryByname, continent];
}


async function CountByConti () {

  countries = await allCountriesData(proxy);
  console.log(countries);

  let america = document.querySelector(`#america`);
  let asia = document.querySelector(`#asia`);
  let europe = document.querySelector(`#europe`);
  let africa = document.querySelector(`#africa`);
  let oceania = document.querySelector(`#oceania`);
  let world = document.querySelector(`#world`);

  let countryQuery = [america, asia, europe, africa, oceania, world];

  america.addEventListener("click", () => console.log(`clicked`));
  asia.addEventListener("click", () => console.log(`clicked`));
  europe.addEventListener("click", () => console.log(`clicked`));
  africa.addEventListener("click", () => console.log(`clicked`));
  oceania.addEventListener("click", () => console.log(`clicked`));
  world.addEventListener("click", () => console.log(`clicked`));
}


CountByConti()
