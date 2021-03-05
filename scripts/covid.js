

// ================ FOR THE COUNTRY TABLE ==================

async function getCountryCoronaData(code) {
  let tr = document.querySelector(`.tr`);
  const src = `https://corona-api.com/countries/${code}`;
  const getdata = await fetch(src);
  let allData = await getdata.json();
  allData = allData.data;
  // console.log(allData);
  tr.innerHTML = `<th class="light">total cases:<br>${allData.latest_data.confirmed}</th>
  <th class="dark">new cases:<br>${allData.today.confirmed}</th>
  <th class="light">total deaths:<br>${allData.latest_data.deaths}</th>
  <th class="dark">new deaths:<br>${allData.today.deaths}</th>
  <th class="light">total recovered:<br>${allData.latest_data.recovered}</th>
  <th class="dark">in critical condition:<br>${allData.latest_data.critical}</th>`
}




//Thiis function recives all the covid data from all countries and orgenize it.
async function continetAnalize(countries) {

  let continentData = [];
  for (const [key, value] of Object.entries(countries)) {
    let continent = {};
    continent.name = key;
    continent.cases = 0;
    continent.death = 0;
    continent.recovered = 0;
    continent.critical = 0;
    continent.countries = [];

    for (ele of value) {
      if (ele[1] != "XK") {
        let src = `https://corona-api.com/countries/${ele[1]}`;
        const getdata = await fetch(src);
        let allData = await getdata.json();

        let cases = allData.data.latest_data.confirmed;
        let death = allData.data.latest_data.deaths;
        let recovered = allData.data.latest_data.recovered;
        let critical = allData.data.latest_data.critical;

        let country = {};
        country.name = `${ele[0]}`;
        country.cases = cases;
        country.death = death;
        country.recovered = recovered;
        country.critical = critical;

        continent.countries.push(country);

        continent.cases += cases;
        continent.death += death;
        continent.recovered += recovered;
        continent.critical += critical;

      }
    }
    continentData.push(continent);
  }
  console.log(`finished!`);
  return continentData;
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
async function CountryByConti(countries) {

  // countries = await allCountriesData(proxy);

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

  let data = await continetAnalize(countries[1]);
  return data;
}



//Char maker
function charMaker(countries, dataType, lable) {

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: countries,
      datasets: [{
        label: lable,
        data: dataType,
        backgroundColor: "#1d2d506e",
        borderColor: "#133b5c",
        borderWidth: 1
      }]
    },
    options: {
      // maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
};

//=======================================




// ============================ MAIN FUNCTION =======================


async function main() {
  const proxy2 = `https://api.allorigins.win/raw?url=`;
  const proxy = `https://api.codetabs.com/v1/proxy/?quest=`;

  charMaker([], [], "Please Wait");

  let spinner =document.querySelector(`.spinner-container`);

  let casesB = document.querySelector(`#cases`);
  let deathB = document.querySelector(`#death`);
  let recoveredB = document.querySelector(`#recovered`);
  let criticalB = document.querySelector(`#critical`);

  let america = document.querySelector(`#america`);
  // console.log(america.textContent);
  let asia = document.querySelector(`#asia`);
  let europe = document.querySelector(`#europe`);
  let africa = document.querySelector(`#africa`);
  let oceania = document.querySelector(`#oceania`);
  let world = document.querySelector(`#world`);

  let selectedCategory;
  let selectedContinent;


  asia.addEventListener("click", () => {
    selectedContinent = asia.textContent;
    console.log(selectedContinent);
    switch (selectedCategory) {
      case 'Cases':
        charMaker(asiaNames, asiaCases, `Cases in Asia`);
        break;
      case 'Death':
        charMaker(asiaNames, asiaDeath, `Death in Asia`);
        break;
      case 'Recovered':
        charMaker(asiaNames, asiaRecovered, `Recovered in Asia`);
        break;
      case 'Critical':
        charMaker(asiaNames, asiaCritical, `Critical in Asia`);
        break;
    }
  })

  america.addEventListener("click", () => {
    selectedContinent = america.textContent;
    console.log(selectedContinent);
    switch (selectedCategory) {
      case 'Cases':
        charMaker(americasNames, americasCases, `Cases in America`);
        break;
      case 'Death':
        charMaker(americasNames, americasDeath, `Death in America`);
        break;
      case 'Recovered':
        charMaker(americasNames, americasRecovered, `Recovered in America`);
        break;
      case 'Critical':
        charMaker(americasNames, americasCritical, `Critical in America`);
        break;
    }
  })

  europe.addEventListener("click", () => {
    selectedContinent = europe.textContent;
    console.log(selectedContinent);
    switch (selectedCategory) {
      case 'Cases':
        charMaker(europeNames, europeCases, `Cases in Europe`);
        break;
      case 'Death':
        charMaker(europeNames, europeDeath, `Death in Europe`);
        break;
      case 'Recovered':
        charMaker(europeNames, europeRecovered, `Recovered in Europe`);
        break;
      case 'Critical':
        charMaker(europeNames, europeCritical, `Critical in Europe`);
        break;
    }
  })
  africa.addEventListener("click", () => {
    selectedContinent = africa.textContent;
    console.log(selectedContinent);
    switch (selectedCategory) {
      case 'Cases':
        charMaker(africaNames, africaCases, `Cases in Africa`);
        break;
      case 'Death':
        charMaker(africaNames, africaDeath, `Death in Africa`);
        break;
      case 'Recovered':
        charMaker(africaNames, africaRecovered, `Recovered in Africa`);
        break;
      case 'Critical':
        charMaker(africaNames, africaCritical, `Critical in Africa`);
        break;
    }
  })
  oceania.addEventListener("click", () => {
    selectedContinent = oceania.textContent;
    console.log(selectedContinent);
    switch (selectedCategory) {
      case 'Cases':
        charMaker(oceaniaNames, oceaniaCases, `Cases in Oceania`);
        break;
      case 'Death':
        charMaker(oceaniaNames, oceaniaDeath, `Death in Oceania`);
        break;
      case 'Recovered':
        charMaker(oceaniaNames, oceaniaRecovered, `Recovered in Oceania`);
        break;
      case 'Critical':
        charMaker(oceaniaNames, oceaniaCritical, `Critical in Oceania`);
        break;
    }
  })


  casesB.addEventListener("click", () => {
    selectedCategory = casesB.textContent;
    console.log(selectedCategory);
    switch (selectedContinent) {
      case 'Asia':
        charMaker(asiaNames, asiaCases, `Cases in Asia`);
        break;
      case 'Africa':
        charMaker(africaNames, africaCases, `Cases in Africa`);
        break;
      case 'America':
        charMaker(americasNames, americasCases, `Cases in America`);
        break;
      case 'Europe':
        charMaker(europeNames, europeCases, `Cases in Europe`);
        break;
      case 'Oceania':
        charMaker(oceaniaNames, oceaniaCases, `Cases in Oceania`);
        break;
    }
  })
  deathB.addEventListener("click", () => {
    selectedCategory = deathB.textContent;
    console.log(selectedCategory);
    switch (selectedContinent) {
      case 'Asia':
        charMaker(asiaNames, asiaDeath, `Death in Asia`);
        break;
      case 'Africa':
        charMaker(africaNames, africaDeath, `Death in Africa`);
        break;
      case 'America':
        charMaker(americasNames, americasDeath, `Death in America`);
        break;
      case 'Europe':
        charMaker(europeNames, europeDeath, `Death in Europe`);
        break;
      case 'Oceania':
        charMaker(oceaniaNames, oceaniaDeath, `Death in Oceania`);
        break;
    }
  })
  recoveredB.addEventListener("click", () => {
    selectedCategory = recoveredB.textContent;
    console.log(selectedCategory);
    switch (selectedContinent) {
      case 'Asia':
        charMaker(asiaNames, asiaRecovered, `Recovered in Asia`);
        break;
      case 'Africa':
        charMaker(africaNames, africaRecovered, `Recovered in Africa`);
        break;
      case 'America':
        charMaker(americasNames, americasRecovered, `Recovered in America`);
        break;
      case 'Europe':
        charMaker(europeNames, europeRecovered, `Recovered in Europe`);
        break;
      case 'Oceania':
        charMaker(oceaniaNames, oceaniaRecovered, `Recovered in Oceania`);
        break;
    }
  })
  criticalB.addEventListener("click", () => {
    selectedCategory = criticalB.textContent;
    console.log(selectedCategory);
    switch (selectedContinent) {
      case 'Asia':
        charMaker(asiaNames, asiaCritical, `Critical in Asia`);
        break;
      case 'Africa':
        charMaker(asiaNames, africaCritical, `Critical in Africa`);
        break;
      case 'America':
        charMaker(americasNames, americasCritical, `Critical in America`);
        break;
      case 'Europe':
        charMaker(europeNames, europeCritical, `Critical in Europe`);
        break;
      case 'Oceania':
        charMaker(oceaniaNames, oceaniaCritical, `Critical in Oceania`);
        break;
    }
  })


  const countriesData = await allCountriesData(proxy);

  const analizedData = await CountryByConti(countriesData);
  console.log(analizedData);

  let code = document.querySelector(`#countryLi`);
  code.addEventListener(`change`, () => {
    getCountryCoronaData(code.value);
    console.log(code.value);
    console.log(code.options[code.selectedIndex].text);
  });

  const getNames = (continent) => {
    let result = [];
    for (ele of continent) {
      result.push(ele.name)
    };
    return result
  }


  const getCases = (continent) => {
    let result = [];
    for (ele of continent) {
      result.push(ele.cases)
    };
    return result
  }


  const getDeath = (continent) => {
    let result = [];
    for (ele of continent) {
      result.push(ele.death)
    };
    return result
  }


  const getRecovered = (continent) => {
    let result = [];
    for (ele of continent) {
      result.push(ele.recovered)
    };
    return result
  }

  const getCritical = (continent) => {
    let result = [];
    for (ele of continent) {
      result.push(ele.critical)
    };
    return result
  }

  const asiaNames = getNames(analizedData[0].countries);
  const asiaCases = getCases(analizedData[0].countries);
  const asiaDeath = getDeath(analizedData[0].countries);
  const asiaRecovered = getRecovered(analizedData[0].countries);
  const asiaCritical = getCritical(analizedData[0].countries);

  const europeNames = getNames(analizedData[1].countries);
  const europeCases = getCases(analizedData[1].countries);
  const europeDeath = getDeath(analizedData[1].countries);
  const europeRecovered = getRecovered(analizedData[1].countries);
  const europeCritical = getCritical(analizedData[1].countries);

  const africaNames = getNames(analizedData[2].countries);
  const africaCases = getCases(analizedData[2].countries);
  const africaDeath = getDeath(analizedData[2].countries);
  const africaRecovered = getRecovered(analizedData[2].countries);
  const africaCritical = getCritical(analizedData[2].countries);

  const oceaniaNames = getNames(analizedData[3].countries);
  const oceaniaCases = getCases(analizedData[3].countries);
  const oceaniaDeath = getDeath(analizedData[3].countries);
  const oceaniaRecovered = getRecovered(analizedData[3].countries);
  const oceaniaCritical = getCritical(analizedData[3].countries);

  const americasNames = getNames(analizedData[4].countries);
  const americasCases = getCases(analizedData[4].countries);
  const americasDeath = getDeath(analizedData[4].countries);
  const americasRecovered = getRecovered(analizedData[4].countries);
  const americasCritical = getCritical(analizedData[4].countries);


  spinner.style.display = "none";



  charMaker([], [], `Choose Continent and Category`);

}


main();

