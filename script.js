let countries = [];

async function fetchCountries() {
    try {
        const url = 'https://restcountries.com/v3.1/independent';
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        // console.log(result);

        countries = result.map(extractCountryFields);
        countries = countries.sort((a, b) => a.name.localeCompare(b.name));
        // console.log(countries);

        displayCountries(countries);
    }
    catch (error) {
        console.error('Error fetching countries:', error);
    }
}
fetchCountries();

function extractCountryFields(country) {
    return {
        name: country.name.common,
        flag: country.flags.png,
        capital: country.capital ? country.capital[0] : 'N/A',
        languages: country.languages ? Object.values(country.languages)[0] : 'N/A',
        map: country.maps.googleMaps,
        population: country.population,
        currency: country.currencies ? Object.keys(country.currencies)[0] : 'N/A',
    }
}

function displayCountries(countries) {
    const countriesList = document.getElementsByClassName('countries-list')[0];

    countriesList.innerHTML = '';

    countries.forEach (country => {
        const listItem = document.createElement('li');

        const img = document.createElement('img');
        img.src = country.flag;
        img.width = 75;

        const hName = document.createElement('h3');
        hName.textContent = country.name;

        const pCapital = document.createElement('p');
        pCapital.textContent = `Capital: ${country.capital}`;

        const pLang = document.createElement('p');
        pLang.textContent = `Language: ${country.languages}`;

        const aMap = document.createElement('a');
        aMap.href = country.map;
        aMap.target = '_blank';
        aMap.textContent = 'Google Maps';

        const pPopulation = document.createElement('p');
        pPopulation.textContent = `Population: ${country.population}`;

        const pCurrency = document.createElement('p');
        pCurrency.textContent = `Currency: ${country.currency}`

        listItem.append(img, hName, pCapital, pLang, aMap, pPopulation, pCurrency);
        countriesList.appendChild(listItem);
    });
}

const searchInput = document.getElementsByClassName('search-input')[0];

searchInput.addEventListener('input', (event) => {
    const inputText = event.target.value.toLowerCase();

    const filteredCountries = countries.filter(
        country => country.name.toLowerCase().includes(inputText)
    );

    displayCountries(filteredCountries);
});