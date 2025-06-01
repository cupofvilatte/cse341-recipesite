const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Recipe API',
        description: 'API for managing recipes'
    },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);