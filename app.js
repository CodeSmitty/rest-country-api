let dataContainer = document.getElementById("data-container");
const api_url = "https://restcountries.eu/rest/v2/all";

const headerAndSearch = document.getElementById("heading-and-search");
const root = document.getElementById("root");
const formSection = document.createElement("section");
formSection.setAttribute("id", "heading-and-search");
const countriesSection = document.createElement("section");
countriesSection.setAttribute("id", "countries-section");

let selectCountry;
console.log(countriesSection);
let fetchedDatas;

fetch(api_url)
  .then((res) => res.json())
  .then((data) => (fetchedDatas = data))
  .then(() => {});

const getCountry = async (url) => {
  const response = await fetch(url)
    .then((res) => res.json())
    .then((data) => data);

  return response;
};

function searchBars() {
  const inputId = "search-bar";
  return `
    <div class='search-and-filter-container'>
      <input id=${inputId} type='text' placeholder="Search for a country" />

      <div id='dropdown-container'>
        <label id='filter-label' for='filter'>Filter By Region:</label>
        <select name='filter' id='filter-dropdown'>
          <option id="options" value=""></option>
          <option id="options" value='Americas'>Americas</option>
          <option id="options" value='Asia'>Asia</option>
          <option id="options" value='Africa'>Africa</option>
          <option id="options" value='Europe'>Europe</option>
          <option id="options" value='Oceania'>Oceania</option>
        </select>
      </div>
      
    </div>
  `;
}

const createdCountries = (count) => {
  return `
    <div onClick="handleClick(this.id)" id='${count.name}' class='country-box'>
      <div  key=${count.name} id="country-div" class='country-data'>
      <img class='flag' src=${count.flag} />
        <h1 class='country-title'>${count.name}</h1>
        <p class="detail-titles"><b>Population</b> ${count.population}</p>
        <p class="detail-titles"><b>Region</b> ${count.region}</p>
        <p class="detail-titles"><b>Capital:</b> ${count.capital}</p>
      </div>
    </div>
`;
};

const countriesDivContainer = (count) => {
  return `
    <div id="countries-container">
  ${count}
    </div>
  `;
};

const renderCountry = async (country, region) => {
  const newFetchedData = fetchedDatas.map((count, i) => {
    let newCountry = createdCountries(count, i);
    return newCountry;
  });

  const newCountryContainerInfuse = countriesDivContainer(
    newFetchedData.join(" ")
  );

  return (countriesSection.innerHTML += newCountryContainerInfuse);
};

const filterCountries = (typedData, fetchedData) => {
  return fetchedData.filter((data) => {
    return data.name.toLowerCase().includes(typedData.toLowerCase());
  });
};

setTimeout(() => {
  const search_bar = document.getElementById("search-bar");
  const dropDown = document.querySelector("select");

  if (search_bar) {
    search_bar.addEventListener("input", async (e) => {
      const typedData = e.target.value;

      const filteredCountries = await filterCountries(typedData, fetchedDatas);

      if (typedData == "") {
        countriesSection.innerHTML = "";
        console.log(typedData);
        renderCountry();
      } else if (typedData) {
        countriesSection.innerHTML = "";
        const newFilteredCountries = filteredCountries.map((country) => {
          let newCountry = createdCountries(country);
          return newCountry;
        });
        const filteredCountriesDiv = countriesDivContainer(
          newFilteredCountries.join(" ")
        );
        countriesSection.innerHTML += filteredCountriesDiv;
      }
    });
  } else {
    console.log("no data");
  }

  const filterByRegion = (selectedData, fetchedData) => {
    return fetchedData.filter((data) => {
      return data.region.includes(selectedData);
    });
  };

  if (dropDown) {
    dropDown.addEventListener("change", async (e) => {
      const typedData = e.target.value;

      const filteredRegions = await filterByRegion(typedData, fetchedDatas);

      if (typedData == "") {
        console.log("hello");
        countriesSection.innerHTML = "";
        renderCountry();
      } else {
        countriesSection.innerHTML = "";
        const newFilteredRegions = filteredRegions.map((item) => {
          const regions = createdCountries(item);
          return regions;
        });
        const filteredRegionsDiv = countriesDivContainer(
          newFilteredRegions.join("  ")
        );

        countriesSection.innerHTML += filteredRegionsDiv;
      }
    });
  }
}, 500);

formSection.innerHTML += searchBars();
window.onload = () => {
  setTimeout(() => {
    dataContainer.appendChild(formSection);
    dataContainer.appendChild(countriesSection);
    renderCountry();
  }, 100);
};

////////////New Window Section //////////////
function handleBorders(border) {
  const newFetchedData = fetchedDatas.find((country, i) => {
    return country.alpha3Code === border ? country : null;
  });

  dataContainer.innerHTML = "";
  dataContainer.innerHTML += selectedCountry(newFetchedData);
}

function selectedCountry(count) {
  console.log(count);
  let borders = count.borders
    .map((x, i) => {
      let fullName = fetchedDatas.find((country) => {
        let name = country.alpha3Code === x;
        return name;
      });
      return `<span class='border-countries' onclick='handleBorders("${x}")'> ${fullName.name}</span>`;
    })
    .join("  ");

  return `
  <div class="details-section">
    <div class='btn-div'>
      <button class='previous-btn' onclick="previousScreen()"><span id='left-arrow'>&#x2190;</span> Back</buttton>
    </div>
    <div  class='details-container'>
      <div class='detail-img-container'>
        <img class='flag' id='flag'src=${count.flag} />
      </div>
      <div class='details-wrapper'  >
        <h1 class='detail-country-title'>${count.name}</h1>
          <div class='detail-country-data' >
            <div class='left-details'>
              <p class="detail-titles" ><b>Native Name</b> <span id='detailed-information'>${count.nativeName}</span></p>
              <p class="detail-titles" ><b>Population</b> <span id='detailed-information'>${count.population}</span></p>
              <p class="detail-titles"><b>Region</b> <span id='detailed-information'>${count.region}</span></p>
              <p class="detail-titles"><b>Sub Region</b> <span id='detailed-information'>${count.subregion}</span></p>
              <p class="detail-titles"><b>Capital:</b><span id='detailed-information'> ${count.capital}</span></p>
            </div>
            <div class='right-details'>
              <p class="detail-titles" ><b>Top Level Domain:</b> <span id='detailed-information'>${count.topLevelDomain}</span></p>
              <p class="detail-titles"><b>Currencies:</b> <span id='detailed-information'>${count.currencies[0].name}</span></p>
              <p class="detail-titles"><b>Languages:</b><span id='detailed-information'> ${count.languages[0].name}</span></p>
            </div>
          </div>
          <p><b class="detail-titles">Border Countries:</b> <span class='border-wrapper'>${borders}</span></p>
      </div>
    </div>
  <div>
`;
}

function previousScreen() {
  dataContainer.innerHTML = "";
  setTimeout(() => {
    dataContainer.appendChild(formSection);
    dataContainer.appendChild(countriesSection);
    renderCountry();
  }, 100);
}

function handleClick(count) {
  const newFetchedData = fetchedDatas.find((country, i) => {
    return country.name === count ? country : null;
  });

  dataContainer.innerHTML = "";
  dataContainer.innerHTML += selectedCountry(newFetchedData);
}

/////////////////////////////////////////Dark Mode///////////////////////////////

setTimeout(() => {
  const darkModeButton = document.getElementById("darkmode-btn");
  // const body = document.getElementsByTagName("body")[0];
  // const headerContainer = document.getElementsByClassName(
  //   "header-container"
  // )[0];
  // const searchBar = document.getElementById("search-bar");
  // const dropDown = document.getElementById("dropdown-container");
  // console.log(dropDown);

  let darkMode = false;
  let theme = document.getElementsByTagName("html")[0];

  darkModeButton.addEventListener("click", handleDarkMode);

  function handleDarkMode() {
    // body.style.backgroundColor = "hsl(207, 26%, 17%)";
    // headerContainer.style.backgroundColor = "hsl(209, 23%, 22%)";
    // headerContainer.style.boxShadow = "0 0px 4px 1px hsl(209, 23%, 22%)";
    // searchBar.setAttribute("id", "drk-search-bar");
    // dropDown.setAttribute("id", "drk-dropdown-container");
    darkMode = !darkMode;
    darkMode ? (theme.dataset.theme = "dark") : (theme.dataset.theme = "light");
  }
}, 300);

/////////////////////////////////////////////////////////////////

//const createCountriesElement = (type, className, data, alt) => {
//   var element = document.createElement(type);

//   if (type === "img") {
//     element.src = data;
//     element.alt = alt;
//     element.classList = className;
//     return element;
//   } else {
//     element.classList = className;
//     element.innerHTML = data;
//     return element;
//   }
// };
