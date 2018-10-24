/*
  * * Create and Export configuration variables
*/

// Container for all environments
const environments = {};

// staging {default} environment
environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: 'staging'
};

// production environments
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: 'production'
};

// determine which should be exported
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

const environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

// export the module
module.exports = environmentToExport;