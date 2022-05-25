const AWS = require("aws-sdk");
const { blogUserTable } = require("../variables/index");
const variables = require("../variables/index");
AWS.config.update({
  region: variables.awsRegion,
  endpoint: variables.ddbEndpoint
});
var docClient = new AWS.DynamoDB.DocumentClient();

exports.getUser = async contactId => {
  const params = {
    TableName: variables.blogUserTable,
    // TableName: "totp",
    Key: {
      contactId: contactId
    }
  };
  return docClient
    .get(params)
    .promise()
    .then(res => res)
    .catch(e => {
      throw { msg: e };
    });
};

exports.createUserAuth = async userInfo => {
  var params = {
    TableName: variables.blogUserAuthTable,
    Item: userInfo
  };
  return docClient
    .put(params)
    .promise()
    .then(res => res)
    .catch(e => e);
};

exports.deleteUserAuth = async contactId => {
  const params = {
    TableName: variables.blogUserAuthTable,
    Key: { contactId: contactId }
  };
  return docClient
    .delete(params)
    .promise()
    .then(res => res);
};
