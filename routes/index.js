const express = require('express');
const newsRouter = require("./news.routes");
const activitiesRouter = require("./activities.routes");
const usersRouter = require("./users.routes");

const routerApi = (app) => {
    const router = express.Router();
    router.use("/news", newsRouter);
    router.use("/activities", activitiesRouter);
    router.use("/users", usersRouter);
    app.use('/api/v1', router);
};

module.exports = routerApi;
