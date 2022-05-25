const router = require("koa-router");
const healthController = require("./controller/healthController");
const userController = require("./controller/userController");
const routes = new router();

routes.get("/health", healthController.health);
routes.post("/signup", userController.signup);
// routes.delete("/auth/:contactId", userController.remove);




module.exports = routes;
