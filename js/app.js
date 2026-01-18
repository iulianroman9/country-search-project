import { fetchCountries } from "./services/api.js";
import * as Data from "./logic/dataManagement.js";
import * as UI from "./ui/render.js";

function handleSearch() {
    const query = UI.getSearchValue();

    if (!Data.isValidSearch(query)) {
        if(query.length > 0) {
            UI.displayError('Please enter at least 3 characters to search.');
        } else {
            UI.displayCountries([]); 
        }
        return;
    }

    const filteredData = Data.filterCountries(query);

    if (filteredData.length === 0) {
        UI.displayError('No countries match your search.');
    }
    else {
        UI.displayCountries(filteredData);
    }
}

async function initApp() {
    const data = await fetchCountries();
    console.log(data);
    if (data) {
        Data.processCountries(data);
    }

    UI.setupInputListener(handleSearch);
}

initApp();