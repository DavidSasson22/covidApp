/* =====================SCRIPT DIAGRAM================= 

 CountryByConti => allCountriesData => 
 */




/* =====================SCRIPT======================== */



// ================ FOR THE COUNTRY TABLE ==================

async function getCountryCoronaData(code) {
  let tr = document.querySelector(`.tr`);
  const src = `https://corona-api.com/countries/${code}`;
  const getdata = await fetch(src);
  let allData = await getdata.json();
  allData = allData.data;
  // console.log(allData);
  tr.innerHTML = `<th>total cases:<br>${allData.latest_data.confirmed}</th>
  <th>new cases:<br>${allData.today.confirmed}</th>
  <th>total deaths:<br>${allData.latest_data.deaths}</th>
  <th>new deaths:<br>${allData.today.deaths}</th>
  <th>total recovered:<br>${allData.latest_data.recovered}</th>
  <th>in critical condition:<br>${allData.latest_data.critical}</th>`
}


//  ==================== FOR THE CONTINENT GRAPH ==================




async function continetAnalize(countries) {

  function ContinentMaker (cases, deaths, recovered, critical) {
    this.cases = cases;
    this.deaths = deaths;
    this.recovered = recovered;
    this.critical = critical;
  }

  console.log(countries);
  console.log(`continetAnalize called`);
  let continentData = {};
  for (const [key, value] of Object.entries(countries)) {
    console.log(`${key}: ${value}`);
    for (ele of value) {
      console.log(ele[1]);
      if(key in continentData) {
        console.log(`true`);
      }
      else {
        console.log(`false`);
        continentData[key] = {};
      }
    }
  }
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

  continetAnalize(countries[1]);

  let countryLi = document.querySelector(`#countryLi`);
  let america = document.querySelector(`#america`);
  let asia = document.querySelector(`#asia`);
  let europe = document.querySelector(`#europe`);
  let africa = document.querySelector(`#africa`);
  let oceania = document.querySelector(`#oceania`);
  let world = document.querySelector(`#world`);


  const basics = () => {
    countryLi.innerHTML = ``;
    countries[0].forEach(element => {
      let option = document.createElement("option");
      option.value = element[1];
      option.text = element[0];
      countryLi.appendChild(option);
    });
  };

  basics();

  america.addEventListener("click", () => {
    countryLi.innerHTML = ``;
    countries[1].Americas.forEach(element => {
      let option = document.createElement("option");
      option.value = element[1];
      option.text = element[0];
      countryLi.appendChild(option);
    });

  });

  asia.addEventListener("click", () => {
    countryLi.innerHTML = ``;
    countries[1].Asia.forEach(element => {
      let option = document.createElement("option");
      option.value = element[1];
      option.text = element[0];
      countryLi.appendChild(option);
    });
  });

  europe.addEventListener("click", () => {
    countryLi.innerHTML = ``;
    countries[1].Europe.forEach(element => {
      let option = document.createElement("option");
      option.value = element[1];
      option.text = element[0];
      countryLi.appendChild(option);
    });
  });

  africa.addEventListener("click", () => {
    countryLi.innerHTML = ``;
    countries[1].Africa.forEach(element => {
      let option = document.createElement("option");
      option.value = element[1];
      option.text = element[0];
      countryLi.appendChild(option);
    });
  });

  oceania.addEventListener("click", () => {
    countryLi.innerHTML = ``;
    countries[1].Oceania.forEach(element => {
      let option = document.createElement("option");
      option.value = element[1];
      option.text = element[0];
      countryLi.appendChild(option);
    });
  });

  world.addEventListener("click", () => {
    countryLi.innerHTML = ``;
    countries[0].forEach(element => {
      let option = document.createElement("option");
      option.value = element[1];
      option.text = element[0];
      countryLi.appendChild(option);
    });
  });



}







// ============================ MAIN FUNCTION =======================
async function main() {
  const proxy = `https://api.allorigins.win/raw?url=`;
  const proxy2 = `https://api.codetabs.com/v1/proxy/?quest=`;

  await CountryByConti(proxy);

  let code = document.querySelector(`#countryLi`);
  code.addEventListener(`change`, () => {
    getCountryCoronaData(code.value);
  })

}


main();
