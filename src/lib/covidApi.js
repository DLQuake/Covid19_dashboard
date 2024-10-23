const BASE_URL = 'https://disease.sh/v3/covid-19';

/**
 * Downloads global COVID-19 statistics
 */
export async function fetchGlobalData() {
    const response = await fetch(`${BASE_URL}/all`);
    if (!response.ok) {
        throw new Error('Failed to fetch global data');
    }
    return await response.json();
}

/**
 * Retrieves COVID-19 statistics for the selected country
 * @param {string} country - Country name e.g. 'Poland'
 */
export async function fetchCountryData(country) {
    const response = await fetch(`${BASE_URL}/countries/${country}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch data for country: ${country}`);
    }
    return await response.json();
}

/**
 * Downloads COVID-19 statistics for all countries
 */
export async function fetchCountriesData() {
    const res = await fetch(`${BASE_URL}/countries`);
    if (!res.ok) {
        throw new Error('Failed to fetch countries data');
    }
    return res.json();
}

/**
 * Downloads global historical COVID-19 statistics
 */
export const fetchGlobalHistoricalData = async () => {
    const response = await fetch(`${BASE_URL}/historical/all`);
    if (!response.ok) {
        throw new Error('Failed to fetch global historical data');
    }
    return response.json();
};
