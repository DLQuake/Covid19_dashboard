import axios from 'axios';

const API_BASE_URL = 'https://disease.sh/v3/covid-19';

const covidAPI = {
    getGlobalStatistics: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/all`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching global statistics: ${error.message}`);
        }
    },

    getCountryStatistics: async (country) => {
        try {
            let url;
            if (country) {
                url = `${API_BASE_URL}/countries/${country}`;
            } else {
                url = `${API_BASE_URL}/countries/`;
            }
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching country statistics: ${error.message}`);
        }
    },


    getHistoricalData: async (country) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/historical/${country}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching historical data: ${error.message}`);
        }
    },
};

export default covidAPI;
