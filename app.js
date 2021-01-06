let dataContainer = document.getElementById("data-container");
const api_url = "https://restcountries.eu/rest/v2/all";


const root = document.getElementById("root");
const formSection = document.createElement("section");
formSection.setAttribute("class", "heading-and-search");
const countriesSection = document.createElement("section");
countriesSection.setAttribute("class", "countries-section");

const loading = `<div class="loader">Loading...</div>`;

formSection.innerHTML += searchBars();

let selectCountry;
let fetchedDatas;

 fetch(api_url)
  .then((res) => res.json())
  .then((data) => (fetchedDatas = data))
  .then(() => {
    if(fetchedDatas){
      dataContainer.innerHTML = "";
      dataContainer.appendChild(formSection);
      dataContainer.appendChild(countriesSection);
      renderCountry(fetchedDatas)
    }else{
      dataContainer.innerHTML = loading;
    }
  });

const getCountry = async (url) => {
  const response = await fetch(url)
    .then((res) => res.json())
    .then((data) => data);

  return response;
};
 const newData = async ()=>await getCountry(api_url);

 console.log(newData)

function searchBars() {
  const inputId = "search-bar";
  return `
    <div class='search-and-filter-container'>
    <div>
      <label for=${inputId} class='sr-only'>Search Country Input</label>
      <input class=${inputId} type='text' name="search-input" placeholder="Search for a country" />
    </div>
      <div class='dropdown-container'>
        <label class='filter-label' for='filter'>Filter By Region:</label>
        <select name='filter' title="dropdown" class='filter-dropdown'>
          <option class="options" value="__blank"></option>
          <option class="options" value='Americas'>Americas</option>
          <option class="options" value='Asia'>Asia</option>
          <option class="options" value='Africa'>Africa</option>
          <option class="options" value='Europe'>Europe</option>
          <option class="options" value='Oceania'>Oceania</option>
        </select>
      </div>
      
    </div>
  `;
}

const createdCountries = (count) => {
  let stringCountry = count.name.toString().replace(/\s+/g, "");

  console.log(stringCountry);
  return `
    <div onClick="handleClick(this.id)" id='${stringCountry}' class='country-box'>
      <div class='country-data country-div'>
      <img class='flag' src=${count.flag} alt="${count.name} flag"/>
        <h2 class='country-title'>${count.name}</h2>
        <p class="detail-titles"><b>Population</b> ${count.population}</p>
        <p class="detail-titles"><b>Region</b> ${count.region}</p>
        <p class="detail-titles"><b>Capital:</b> ${count.capital}</p>
      </div>
    </div>
`;
};

const countriesDivContainer = (count) => {
  return `
    <div class="countries-container">
  ${count}
    </div>
  `;
};

async function renderCountry (data) {
  const newFetchedData = 
     await data?.map((count, i) => {
        let newCountry = createdCountries(count, i);
        return newCountry;
      });

  const newCountryContainerInfuse = countriesDivContainer(
    newFetchedData.join(" ")
  );
  console.log(fetchedDatas);
  return (countriesSection.innerHTML += newCountryContainerInfuse);
};

const filterCountries = (typedData, fetchedData) => {
  return fetchedData.filter((data) => {
    return data.name.toLowerCase().includes(typedData.toLowerCase());
  });
};

setTimeout(() => {
  const search_bar = document.getElementsByClassName("search-bar")[0];
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


window.onload = () => {
  setTimeout(() => {
    
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
      <button class='previous-btn' onclick="previousScreen()"><span class='left-arrow'>&#x2190;</span> Back</buttton>
    </div>
    <div  class='details-container'>
      <div class='detail-img-container'>
        <img class='flag' src=${count.flag} />
      </div>
      <div class='details-wrapper'  >
        <h1 class='detail-country-title'>${count.name}</h1>
          <div class='detail-country-data' >
            <div class='left-details'>
              <p class="detail-titles" ><b>Native Name</b> <span class='detailed-information'>${count.nativeName}</span></p>
              <p class="detail-titles" ><b>Population</b> <span class='detailed-information'>${count.population}</span></p>
              <p class="detail-titles"><b>Region</b> <span class='detailed-information'>${count.region}</span></p>
              <p class="detail-titles"><b>Sub Region</b> <span class='detailed-information'>${count.subregion}</span></p>
              <p class="detail-titles"><b>Capital:</b><span class='detailed-information'> ${count.capital}</span></p>
            </div>
            <div class='right-details'>
              <p class="detail-titles" ><b>Top Level Domain:</b> <span class='detailed-information'>${count.topLevelDomain}</span></p>
              <p class="detail-titles"><b>Currencies:</b> <span class='detailed-information'>${count.currencies[0].name}</span></p>
              <p class="detail-titles"><b>Languages:</b><span class='detailed-information'> ${count.languages[0].name}</span></p>
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

function handleClick(givenCountry) {
  let count = givenCountry.replace(/\s+/g, " ");

  const newFetchedData = fetchedDatas.find((country, i) => {
    return country.name === count ? country : null;
  });

  dataContainer.innerHTML = "";
  dataContainer.innerHTML += selectedCountry(newFetchedData);
}

/////////////////////////////////////////Dark Mode///////////////////////////////

setTimeout(() => {
  const darkModeButton = document.getElementsByClassName("darkmode-btn")[0];

  let darkMode = false;
  let theme = document.getElementsByTagName("html")[0];

  darkModeButton.addEventListener("click", handleDarkMode);

  function handleDarkMode() {
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
