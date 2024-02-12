/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
const admin = require("firebase-admin");

// NOTE: To get a sample response from these API endpoints refer to the readme in the route directory

const reportTestRouteServer = (_req, res, next) => {
  return res.send("Inside the reports router");
};

// TODO:
const reportProductAllServer = (req, res, next) => {
  const { productId } = req.params;
  const { startDate, endDate } = req.query;
  return res.send(`Product Report for ${productId} from ${startDate} to ${endDate}`);
};

const reportProductServer = (req, res, next) => {
  const { productId } = req.params;
  return res.send(`Product Report for ${productId}`);
};

const reportOrderServer = (req, res, next) => {
  const { orderId } = req.params;
  return res.send(`Order Report for ${orderId}`);
};

const reportOrderAllServer = (req, res, next) => {
  const { startDate, endDate } = req.query;
  return res.send(`Order Report from ${startDate} to ${endDate}`);
};

const reportUserServer = (req, res, next) => {
  const { userId } = req.params;
  return res.send(`User Report for ${userId}`);
};

const reportUserAllServer = (req, res, next) => {
  const { startDate, endDate } = req.query;
  return res.send(`User Report from ${startDate} to ${endDate}`);
};

// TODO:

module.exports = {
  reportTestRouteServer, reportProductAllServer, reportProductServer, reportOrderServer, reportOrderAllServer, reportUserServer, reportUserAllServer,
};
