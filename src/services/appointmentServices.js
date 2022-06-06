const Appointment = require('../models/Appointment');
const AppointmentRepository = require('../repository/AppointmentRepository');

//responsavel pelas regras de negocio. valida e chama o repository
class AppointmentService {
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    insertOne(){
        // find
        // same date? throw error
        // dados fazem sentido? regras de negocio
        const appointment = this.appointmentRepository.create({appointment_id})
        return appointment;
    }

    readAll() {}

    findByDate() {}

    findByRangeDate() {}

    findByIdOrDocumentNumber() {}

    update() {}

    delete() {}
}


module.exports = AppointmentService;