// netlify/functions/getCats.js
const fetch = require('node-fetch');  // Necesitarás instalar node-fetch

exports.handler = async function(event, context) {
    const url = process.env.CAT_API_URL;
    const apiKey = process.env.CAT_API_KEY;
    
    try {
        const response = await fetch(`${url}?api_key=${apiKey}`);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al obtener datos' }),
        };
    }
};
