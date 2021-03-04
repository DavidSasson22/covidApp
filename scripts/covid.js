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


async function CountByConti() {

  countries = await allCountriesData(proxy);

  let countryLi = document.querySelector(`#countryLi`);
  let america = document.querySelector(`#america`);
  let asia = document.querySelector(`#asia`);
  let europe = document.querySelector(`#europe`);
  let africa = document.querySelector(`#africa`);
  let oceania = document.querySelector(`#oceania`);
  let world = document.querySelector(`#world`);


  america.addEventListener("click", () => {
    countryLi.innerHTML = ``;
    countries[1].Americas.forEach(element => {
      let option = document.createElement("option");
      option.value = element;
      option.text = element;
      countryLi.appendChild(option);
    });

  });

  asia.addEventListener("click", () => {
    countryLi.innerHTML = ``;
    countries[1].Asia.forEach(element => {
      let option = document.createElement("option");
      option.value = element;
      option.text = element;
      countryLi.appendChild(option);
    });
  });

  europe.addEventListener("click", () => {
    countryLi.innerHTML = ``;
    countries[1].Europe.forEach(element => {
      let option = document.createElement("option");
      option.value = element;
      option.text = element;
      countryLi.appendChild(option);
    });
  });

  africa.addEventListener("click", () => {
    countryLi.innerHTML = ``;
    countries[1].Africa.forEach(element => {
      let option = document.createElement("option");
      option.value = element;
      option.text = element;
      countryLi.appendChild(option);
    });
  });

  oceania.addEventListener("click", () => {
    countryLi.innerHTML = ``;
    countries[1].Oceania.forEach(element => {
      let option = document.createElement("option");
      option.value = element;
      option.text = element;
      countryLi.appendChild(option);
    });
  });

  world.addEventListener("click", () => {
    countryLi.innerHTML = ``;
    countries[0].forEach(element => {
      let option = document.createElement("option");
      option.value = element[0];
      option.text = element[0];
      countryLi.appendChild(option);
    });
  });
}


CountByConti()
