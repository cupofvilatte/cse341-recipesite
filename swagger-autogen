// swagger.js (just for generation)
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Recipe API',
    description: 'API for managing recipes'
  }
  // don't set host and schemes here; let it default
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated');
});
