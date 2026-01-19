const SEARCH_HISTORY_KEY = 'search_history';
const FAVORITES_KEY = 'favorite_countries';

export function getSearchHistory() {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
}

export function addRecentSearch(query) {
    let history = getSearchHistory();

    history = history.filter(item => item.toLowerCase() !== query.toLowerCase());

    history.unshift(query);

    if (history.length > 10 ) {
        history = history.slice(0, 10);
    }

    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
}

export function getFavoriteCountries() {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
}

export function toggleFavorite(country) {
    let favorites = getFavoriteCountries();
    const idx = favorites.findIndex(fav => fav.name === country.name);

    if (idx === -1) {
        favorites.push(country);
    } else {
        favorites.splice(idx, 1);
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return favorites;
}

export function isFavorite(country) {
    const favorites = getFavoriteCountries();
    return favorites.some(fav => fav.name === country.name);
}