const axios = require("axios").default;
const variables = require("../variables/index");

exports.getUserDetailsByEmail = async email => {
  return axios
    .post(`${variables.blogUserService}/private/user`, {email: email})
    .then(res => res.data.data);
};

exports.createUser = async userInfo => {
  return axios
    .post(`${variables.blogUserService}/user`, {userInfo: userInfo})
    .then(res => res.data);
};
