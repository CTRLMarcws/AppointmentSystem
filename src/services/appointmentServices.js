const Appointment = require('../models/Appointment');
const AppointmentRepository = require('../repository/AppointmentRepository');

//responsavel pelas regras de negocio. valida e chama o repository
class AppointmentService {
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    async insertOne(
        cx_doc_number,
        app_value,
        app_state,
        app_doc_name,
        app_date){
        // find
        // same date? throw error
        // dados fazem sentido? regras de negocio
        let id = appointment_id;
        const appointment = await this.appointmentRepository.insert(id);
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