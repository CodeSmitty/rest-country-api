let dataContainer = document.getElementById("data-container");
const api_url = "https://restcountries.eu/rest/v2/all";
const search_bar = document.getElementById("search-bar");
const dropDown = document.querySelector("select");

const getCountry = async (url) => {
  const response = await fetch(url)
    .then((res) => res.json())
    .then((data) => data);

  return response;
};

const createCountriesElement = (type, className, data, alt) => {
  var element = document.createElement(type);

  if (type === "img") {
    element.src = data;
    element.alt = alt;
    element.classList = className;
    return element;
  } else {
    element.classList = className;
    element.innerHTML = data;
    return element;
  }
};

const createdCountries = (count) => {
  const countryBox = createCountriesElement("div", "country-box", "");
  const countryData = createCountriesElement("div", "country-data", "");
  const name = createCountriesElement("h1", "country-title", count.name);
  const population = createCountriesElement(
    "p",
    "population",
    `<span style="font-weight:800">Population:</span> ${count.population}`
  );
  const region = createCountriesElement(
    "p",
    "region",
    `<span style="font-weight:800">Region:</span> ${count.region}`
  );
  const capital = createCountriesElement(
    "p",
    "capital",
    `<span style="font-weight:800">Capital:</span> ${count.capital}`
  );
  const flag = createCountriesElement(
    "img",
    "flag",
    count.flag,
    "image of flag"
  );

  countryBox.appendChild(countryData);

  countryData.appendChild(flag);
  countryData.appendChild(name);
  countryData.appendChild(population);
  countryData.appendChild(region);
  countryData.appendChild(capital);
  return `
    <div class='country-box'>
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

const createRegionCountries = (count) => {
  const countryBox = createCountriesElement("div", "country-box", "");
  const countryData = createCountriesElement("div", "country-data", "");
  const name = createCountriesElement("h1", "country-title", count.name);
  const population = createCountriesElement(
    "p",
    "population",
    `<span style="font-weight:800">Population:</span> ${count.population}`
  );
  const region = createCountriesElement(
    "p",
    "region",
    `<span style="font-weight:800">Region:</span> ${count.region}`
  );
  const capital = createCountriesElement(
    "p",
    "capital",
    `<span style="font-weight:800">Capital:</span> ${count.capital}`
  );
  const flag = createCountriesElement(
    "img",
    "flag",
    count.flag,
    "image of flag"
  );

  countryBox.appendChild(countryData);

  countryData.appendChild(flag);
  countryData.appendChild(name);
  countryData.appendChild(population);
  countryData.appendChild(region);
  countryData.appendChild(capital);
  return countryBox;
};

const renderCountry = async (country, region) => {
  const fetchedCountries = await getCountry(api_url);

  return fetchedCountries.map((count) => {
    let newCountry = createdCountries(count);
    dataContainer.innerHTML += newCountry;
  });
};

const filterCountries = (typedData, fetchedData) => {
  return fetchedData.filter((data) => {
    return data.name.toLowerCase().includes(typedData.toLowerCase());
  });
};

search_bar.addEventListener("input", async (e) => {
  const data = await fetch(api_url);
  const fetchedData = await data.json();
  const typedData = e.target.value;

  const filteredCountries = await filterCountries(typedData, fetchedData);

  if(typedData == ""){
    console.log('hello')
    dataContainer.innerHTML = ""
    renderCountry()
  }else if(typedData){
    dataContainer.innerHTML = ""
    filteredCountries.map((country) => {
      let newCountry = createdCountries(country);
      dataContainer.innerHTML += newCountry;
    });
  }


});

const filterByRegion = (selectedData, fetchedData) => {
  return fetchedData.filter((data) => {
    return data.region.includes(selectedData);
  });
};

dropDown.addEventListener("change", async (e) => {
  const data = await fetch(api_url);
  const fetchedData = await data.json();
  const typedData = e.target.value;

  console.log(typedData);

  const filteredRegions = await filterByRegion(typedData, fetchedData);

  if(typedData == ""){
    console.log('hello')
    dataContainer.innerHTML = "";
    renderCountry()
  }else{
    dataContainer.innerHTML = ""
    filteredRegions.map((item) => {
      const regions = createdCountries(item);
      
      dataContainer.innerHTML += regions;
    });
  }
  
});

renderCountry()

