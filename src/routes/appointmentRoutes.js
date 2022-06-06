import { Router } from 'express';

import AppointmentRepository from "../repository/appointmentRepository";
import AppointmentService from '../services/appointmentService'

const appointmentRouter = Router();
const AppointmentRepository = new AppointmentRepository();

appointmentRouter.get('/', (req, res) => {
    const appointments = AppointmentRepository.all();
    return res.json(appointments)
})

appointmentRouter.post('/applynew', (req, res) => {
    try {
        const { appointment_id } = req.body;
        const createAppointment = new AppointmentService(AppointmentRepository);

        const appointment = createAppointment.execute({
            appointment_id
        })
        return res.json(appointment)
    } catch (error) {
        return response.status(400).json({error})
    }
})

export default appointmentRouter;