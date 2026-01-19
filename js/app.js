import { fetchCountries } from "./services/api.js";
import * as Data from "./services/countryService.js";
import * as UI from "./ui/render.js";
import * as StorageService from "./services/storageService.js";

async function initApp() {
    const data = await fetchCountries();
    console.log(data);
    if (data) {
        Data.processCountries(data);
    }

    const favorites = StorageService.getFavoriteCountries();
    UI.displayFavorites(favorites);
    UI.setupFavoritesToggle();
    UI.setupFavoritesListener(handleSearch);

    UI.displaySearchHistory(StorageService.getSearchHistory());
    UI.setupInputListener(handleSearch);
    UI.setupHistoryListener(handleSearch);
}

function handleFavoriteToggle(country) {
    const updatedFavorites = StorageService.toggleFavorite(country);
    UI.displayFavorites(updatedFavorites);
}

function handleSearch() {
    const query = UI.getSearchValue();

    if (!Data.isValidSearch(query)) {
        if(query.length > 0) {
            UI.displayError('Please enter at least 3 characters to search.');
        } else {
            UI.displayCountries([], handleFavoriteToggle); 
        }
        return;
    }

    const filteredData = Data.filterCountries(query);

    if (filteredData.length === 0) {
        UI.displayError('No countries match your search.');
    }
    else {
        StorageService.addRecentSearch(query);
        UI.displaySearchHistory(StorageService.getSearchHistory());
        UI.displayCountries(filteredData, handleFavoriteToggle);
    }
}

initApp();