const appPort = process.env.APP_PORT;
const ddbEndpoint = process.env.DYNAMO_ENDPOINT;
const awsRegion = process.env.AWS_REGION;
const appHost = process.env.APP_HOST || "localhost";
const env = process.env.APP_ENV;
const blogUserTable = process.env.BLOG_USER_TABLE;
const blogUserAuthTable = process.env.BLOG_USER_AUTH_TABLE;
const blogUserService = process.env.BLOG_USER_SERVICE;

const variables = {
  appPort,
  ddbEndpoint,
  awsRegion,
  appHost,
  env,
  blogUserTable,
  blogUserAuthTable,
  blogUserService
};

module.exports = variables;
