const countriesList = document.querySelector('.countries-list');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

export function displayCountries(countries) {
    countriesList.innerHTML = '';

    countries.forEach(country => {
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
        pCurrency.textContent = `Currency: ${country.currency}`;

        listItem.append(img, hName, pCapital, pLang, aMap, pPopulation, pCurrency);
        countriesList.appendChild(listItem);
    });
}

export function displayError(message) {
    countriesList.innerHTML = '';
    const messageItem = document.createElement('li');
    messageItem.style.padding = '20px';
    messageItem.textContent = message;
    countriesList.appendChild(messageItem);
}

export function getSearchValue() {
    return searchInput.value.trim();
}

export function setupInputListener(handleSearch) {
    searchInput.addEventListener('input', handleSearch);
    searchButton.addEventListener('click', handleSearch);
}