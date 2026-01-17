export async function fetchCountries() {
    try {
        const url = 'https://restcountries.com/v3.1/independent';
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }
    catch (error) {
        console.error('Error fetching countries:', error);
        return [];
    }
}