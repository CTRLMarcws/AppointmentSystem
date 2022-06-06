import Appointment from '../models/Appointment';
import AppointmentRepository from '../repository/AppointmentRepository';

class AppointmentService {
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    execute(){
        // find
        // same date? throw error
        const appointment = this.appointmentRepository.create({appointment_id})
        return appointment;
    }
}


export default AppointmentService;