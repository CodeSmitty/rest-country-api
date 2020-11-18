let dataContainer = document.getElementById("data-container");
const api_url = "https://restcountries.eu/rest/v2/all";
const search_bar = document.getElementById("search-bar");
const dropDown = document.querySelector("select");
const headerAndSearch = document.getElementById("heading-and-search");
//const root = document.getElementById('root')

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

const searchBars = () => {
  return `
  <section id='heading-and-search'>
    <div class='search-and-filter-container'>
      <input id='search-bar' type='text' placeholder="Search for a country" />

      <div id='dropdown-container'>
        <label id='filter-label' for='filter'>Filter By Region:</label>
        <select name='filter' id='filter-dropdown'>
          <option value=""></option>
          <option value='Africa'>Africa</option>
          <option value='Americas'>Americas</option>
          <option value='Asia'>Asia</option>
          <option value='Europe'>Europe</option>
          <option value='Oceania'>Oceania</option>
        </select>
      </div>
      
    </div>
    </section>
  `;
};

const createdCountries = (count) => {
  return `
  
    <div onclick="handleClick()" class='country-box'>
      <div class='country-data'>
      <img class='flag' src=${count.flag} />
        <h1 class='country-title'>${count.name}</h1>
        <p class='population'><b>Population</b> ${count.population}</p>
        <p class='region'><b>Region</b> ${count.region}</p>
        <p class='capital'><b>Capital:</b> ${count.capital}</p>
        
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
  const newFetchedData = fetchedDatas.map((count) => {
    let newCountry = createdCountries(count);
    return newCountry;
  });

  const newCountryContainerInfuse = countriesDivContainer(
    newFetchedData.join(" ")
  );

  return (dataContainer.innerHTML += newCountryContainerInfuse);
};

const filterCountries = (typedData, fetchedData) => {
  return fetchedData.filter((data) => {
    return data.name.toLowerCase().includes(typedData.toLowerCase());
  });
};

if (search_bar) {
  search_bar.addEventListener("input", async (e) => {
    const typedData = e.target.value;

    const filteredCountries = await filterCountries(typedData, fetchedDatas);

    if (typedData == "") {
      dataContainer.innerHTML = "";
      renderCountry();
    } else if (typedData) {
      dataContainer.innerHTML = "";
      filteredCountries.map((country) => {
        let newCountry = createdCountries(country);
        dataContainer.innerHTML += newCountry;
      });
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
      dataContainer.innerHTML = "";
      renderCountry();
    } else {
      dataContainer.innerHTML = "";
      filteredRegions.map((item) => {
        const regions = createdCountries(item);

        dataContainer.innerHTML += regions;
      });
    }
  });
}

////////////New Window Section //////////////

const createDetailContainer = () => {
  return `
    <div>
    <button class='previous-btn' onclick="previousScreen()">Back</buttton>
    </div>
  `;
};

function previousScreen() {
  console.log("hola");
}

const handleClick = () => {
  // dataContainer.innerHTML = ""
  // dataContainer.innerHTML += createDetailContainer()
};

window.onload = () => {
  setTimeout(() => {
    dataContainer.innerHTML += searchBars();
    renderCountry();
  }, 300);
};



/////////////////////////////////////////////////////////////////
//I changed the rendercountry function to add a separate container for the search bars and the countries themselves to keep wanted css. 
// I need to work on maybe saving data to an object and pulling from that so that I can give each div an id. 
// first idea is change some id to classes so that I can use like react javascript to dynamically give each div and Id of it's mapped country.

// const createRegionCountries = (count) => {
//   const countryBox = createCountriesElement("div", "country-box", "");
//   const countryData = createCountriesElement("div", "country-data", "");
//   const name = createCountriesElement("h1", "country-title", count.name);
//   const population = createCountriesElement(
//     "p",
//     "population",
//     `<span style="font-weight:800">Population:</span> ${count.population}`
//   );
//   const region = createCountriesElement(
//     "p",
//     "region",
//     `<span style="font-weight:800">Region:</span> ${count.region}`
//   );
//   const capital = createCountriesElement(
//     "p",
//     "capital",
//     `<span style="font-weight:800">Capital:</span> ${count.capital}`
//   );
//   const flag = createCountriesElement(
//     "img",
//     "flag",
//     count.flag,
//     "image of flag"
//   );

//   countryBox.appendChild(countryData);

//   countryData.appendChild(flag);
//   countryData.appendChild(name);
//   countryData.appendChild(population);
//   countryData.appendChild(region);
//   countryData.appendChild(capital);
//   return countryBox;
// };

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
