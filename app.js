const dataContainer = document.getElementById("data-container");
const api_url = "https://restcountries.eu/rest/v2/all";
const search_bar = document.getElementById("search-bar");

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

  dataContainer.appendChild(countryBox);
};

const renderCountry = async (country, region) => {
const fetchedCountries = await getCountry(api_url)
  if(country){
createdCountries(country)

  }
  
};

const filterCountries = (typedData, fetchedData) => {
  return fetchedData.filter((data) => {
    console.log(typedData)
    return data.name.match(new RegExp(`^${typedData}`, "i"));
  });
};

search_bar.addEventListener("input", async (e) => {
  const typedData = e.target.value;

  const fetchedData = await getCountry(api_url);
  const filteredCountries = filterCountries(typedData, fetchedData);

  filteredCountries.filter(country =>{
  renderCountry(country)
  })




 
});



const countries = renderCountry();
