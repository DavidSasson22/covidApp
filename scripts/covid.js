/* =====================SCRIPT DIAGRAM================= 

 CountryByConti => allCountriesData => 
 */




/* =====================SCRIPT======================== */

async function getCountryCoronaData(code) {
  const src = `https://corona-api.com/countries/${code}`;
  const getdata = await fetch(src);
  let allData = await getdata.json();
  allData = allData.data;
  // console.log(allData);
}


/* This function get the information we need from 'restcountries.herokuapp.com', i.e: it returns a list of all countries name, and an ocject of all continent and their countries */
async function allCountriesData(proxy) {

  let countryByname = [];
  let continent = {};

  const countrySrc = `${proxy}https://restcountries.herokuapp.com/api/v1`;
  const getdata = await fetch(countrySrc);
  let allCountries = await getdata.json();
  // console.log(allCountries);

  for (country of allCountries) {
    countryByname.push([country.name.common, country.cca2, country.region]);
  }

  for (country of countryByname) {
    if (country[2] in continent) {
      continent[country[2]].push([country[0], country[1]]);
    }
    else {
      continent[country[2]] = [[country[0], country[1]]];
    }
  }
  // console.log(countryByname);
  // console.log(continent);
  return [countryByname, continent];
}


/* This fuction gets data from allCountriesData, and create html elemnts and add event listeners according to it*/
async function CountryByConti(proxy) {

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
      option.value = element[0];
      option.text = element[0];
      countryLi.appendChild(option);
    });

  });

  asia.addEventListener("click", () => {
    countryLi.innerHTML = ``;
    countries[1].Asia.forEach(element => {
      let option = document.createElement("option");
      option.value = element[0];
      option.text = element[0];
      countryLi.appendChild(option);
    });
  });

  europe.addEventListener("click", () => {
    countryLi.innerHTML = ``;
    countries[1].Europe.forEach(element => {
      let option = document.createElement("option");
      option.value = element[0];
      option.text = element[0];
      countryLi.appendChild(option);
    });
  });

  africa.addEventListener("click", () => {
    countryLi.innerHTML = ``;
    countries[1].Africa.forEach(element => {
      let option = document.createElement("option");
      option.value = element[0];
      option.text = element[0];
      countryLi.appendChild(option);
    });
  });

  oceania.addEventListener("click", () => {
    countryLi.innerHTML = ``;
    countries[1].Oceania.forEach(element => {
      let option = document.createElement("option");
      option.value = element[0];
      option.text = element[0];
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



async function main() {
  const proxy = `https://api.allorigins.win/raw?url=`;
  const proxy2 = `https://api.codetabs.com/v1/proxy/?quest=`;
  await CountryByConti(proxy);
  await getCountryCoronaData("AF");
}


main();