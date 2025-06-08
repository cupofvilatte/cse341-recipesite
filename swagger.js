const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Recipe API',
        description: 'API for managing recipes'
    },
    host: 'cse341-recipesite.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger doc generated');
});