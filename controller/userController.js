const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userDetailsModel = require("../model/userDetailsModel");
const ddb = require("../model/ddb");

exports.signup = async ctx => {
  try {
    const userInfo = ctx.request.body;
    if (!userInfo.email || !userInfo.mobile || !userInfo.password) {
      return (ctx.body = {
        status: "Failed",
        msg: "Some required field are missing"
      });
    }
    const userDetails = await userDetailsModel.getUserDetailsByEmail(
      userInfo.email
    );
    if (userDetails.Items.length) {
      return (ctx.body = { status: "success", msg: "User already exists" });
    }
    userInfo.contactId = uuidv4();
    const userCreateData = await userDetailsModel.createUser(userInfo);
    if (userCreateData.status === "failed") {
      return (ctx.body = userCreateData);
    }
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    await ddb.createUserAuth({
      contactId: userInfo.contactId,
      email: userInfo.email,
      password: hashedPassword,
      mobile: userInfo.mobile
    });
    ctx.body = {
      status: "success",
      msg: "Successfully created user"
    };
  } catch(error) {
        ctx.body = { status: "Failed", error: JSON.stringify(error, null, 2) };
  }
};

exports.remove = async ctx => {
  try {
    const contactId = ctx.request.params.contactId;
    await ddb.deleteUserAuth(contactId);
    ctx.body = { ok: "ok" };
  } catch(error) {
       ctx.body = { status: "Failed", error: JSON.stringify(error, null, 2) };
  }
};
