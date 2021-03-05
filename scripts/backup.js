

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
  // let casesB = document.querySelector(`#cases`);
  // let deathB = document.querySelector(`#death`);
  // let recoveredB = document.querySelector(`#recovered`);
  // let criticalB = document.querySelector(`#critical`);

  // let buttons = [casesB, deathB, recoveredB, criticalB];


  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: countries,
      datasets: [{
        label: lable,
        data: dataType,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  console.log(`activated`);
};

//=======================================




// ============================ MAIN FUNCTION =======================


async function main() {
  const proxy = `https://api.allorigins.win/raw?url=`;
  const proxy2 = `https://api.codetabs.com/v1/proxy/?quest=`;


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




  charMaker(asiaNames, asiaDeath, `Death in Asia`);

}


main();
