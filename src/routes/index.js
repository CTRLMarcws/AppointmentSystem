const { Router } = require('express');
const appointmentRouter = require('./appointmentRoutes');
// const customerRouter = require('./customerRoutes');

const routes = Router();

routes.use('/appointments', appointmentRouter);
// routes.use('/customer', customerRouter);

module.exports = routes;