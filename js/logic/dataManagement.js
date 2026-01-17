let storedCountries = [];

function extractCountryFields(country) {
    return {
        name: country.name.common,
        flag: country.flags.png,
        capital: country.capital ? country.capital[0] : 'N/A',
        languages: country.languages ? Object.values(country.languages)[0] : 'N/A',
        map: country.maps.googleMaps,
        population: country.population.toLocaleString(), // Added formatting
        currency: country.currencies ? Object.keys(country.currencies)[0] : 'N/A',
    };
}

export function processCountries(data) {
    storedCountries = data.map(extractCountryFields)
        .sort((a, b) => a.name.localeCompare(b.name));
    return storedCountries;
}

export function filterCountries(query) {
    const lowerQuery = query.toLowerCase();
    
    return storedCountries.filter(country => 
        country.name.toLowerCase().includes(lowerQuery)
    );
}

export function isValidSearch(query) {
    return query.length >= 3;
}