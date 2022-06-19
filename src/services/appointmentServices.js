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
        let id = appointment_id;
        const appointment = this.appointmentRepository.insert({id});
        console.log()
        return appointment;
    }

    async readAll() {
        const appointments = await this.appointmentRepository.readAll()
        return appointments;
    }

    findByDate() {}

    findByRangeDate() {}

    findByIdOrDocumentNumber() {}

    update() {}

    delete() {}
}


module.exports = AppointmentService;