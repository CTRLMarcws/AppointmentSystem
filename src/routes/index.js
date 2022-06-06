import { Router } from 'express';
import appointmentRouter from './appointmentRoutes'
import customerRouter from './customerRoutes'

const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/customer', customerRouter);

export default routes;