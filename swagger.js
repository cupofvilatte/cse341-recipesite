const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Recipe API',
        description: 'API for managing recipes'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);