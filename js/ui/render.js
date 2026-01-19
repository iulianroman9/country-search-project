import { isFavorite } from "../services/storageService.js";

const historyList = document.querySelector('.recent-searches');
const countriesList = document.querySelector('.countries-list');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const errorContainer = document.querySelector('.search-error');
const favoritesContainer = document.querySelector('.favorites');
const favoriteButton = document.querySelector('.favorites-toggle');
const favoritesList = document.querySelector('.favorites-list');

export function displaySearchHistory(history) {
    historyList.innerHTML = '';

    if (!history || history.length === 0) {
        hideSearchHistory();
        return;
    }

    showSearchHistory();

    history.forEach(query => {
        const li = document.createElement('li');
        li.textContent = query;
        historyList.appendChild(li);
    });
}

export function hideSearchHistory() {
    historyList.classList.add('hidden');
}

export function showSearchHistory() {
    historyList.classList.remove('hidden');
}

export function displayCountries(countries, favToggle) {
    countriesList.innerHTML = '';
    errorContainer.textContent = '';

    countries.forEach(country => {
        const listItem = document.createElement('li');

        const starBtn = document.createElement('button');
        starBtn.className = 'star-btn';
        starBtn.textContent = '★'

        if (isFavorite(country)) {
            starBtn.classList.add('active');
        }

        starBtn.addEventListener('click', () => {
            favToggle(country); 
            starBtn.classList.toggle('active');
        });

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

        listItem.append(starBtn, img, hName, pCapital, pLang, aMap, pPopulation, pCurrency);
        countriesList.appendChild(listItem);
    });
}

export function displayFavorites(favorites) {
    favoritesList.innerHTML = '';
    
    if (!favorites || favorites.length === 0) {
        favoritesContainer.classList.add('hidden'); 
        return;
    }

    favoritesContainer.classList.remove('hidden'); 

    favorites.forEach(country => {
        const li = document.createElement('li');
        
        const img = document.createElement('img');
        img.src = country.flag;
        
        const name = document.createElement('span');
        name.textContent = country.name;
        
        li.append(img, name);
        favoritesList.appendChild(li);
    });
}

export function setupFavoritesToggle() {
    if (favoriteButton) {
        favoriteButton.addEventListener('click', () => {
            favoritesList.classList.toggle('hidden');
        });
    }
}

export function displayError(message) {
    countriesList.innerHTML = '';
    errorContainer.textContent = message;
}

export function getSearchValue() {
    return searchInput.value.trim();
}

export function setupInputListener(handleSearch) {
    let timer;

    searchInput.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            handleSearch();
        }, 300);
    });

    searchButton.addEventListener('click', handleSearch);
}

export function setupHistoryListener(handleSearch) {
    historyList.addEventListener('click', (event) => {
        if (event.target.tagName.toLowerCase() === 'li') {
            searchInput.value = event.target.textContent;
            handleSearch();
        }});
}

export function setupFavoritesListener(handleSearch) {
    favoritesList.addEventListener('click', (event) => {
        const clicked = event.target.closest('li');

        if (clicked) {
            const span = clicked.querySelector('span');

            const countryName = span ? span.textContent : clicked.textContent;
            searchInput.value = countryName;
            handleSearch();
        }
    });
}