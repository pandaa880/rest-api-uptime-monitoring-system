/*
  * * Create and Export configuration variables
*/

// Container for all environments
const environments = {};

// staging {default} environment
environments.staging = {
  port: 3000,
  envName: 'staging'
};

// production environments
environments.production = {
  port: 5000,
  envName: 'production'
};

// determine which should be exported
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

const environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

// export the module
module.exports = environmentToExport;