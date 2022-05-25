require("dotenv").config();
const variables = require("./variables/index");

const koa = require("koa");
const koaBody = require("koa-body");
const router = require("./route");

const app = new koa();

app.use(koaBody());
app.use(router.routes());

app.listen(variables.appPort, () => {
  console.log(
    `Listening on ${variables.appHost}:${variables.appPort}, in ${variables.env}`
  );
});
