const Appointment = require("../models/Appointment");
const AppointmentRepository = require("../repository/AppointmentRepository");
const { v4 } = require('uuid');

//responsavel pelas regras de negocio. valida e chama o repository
class AppointmentService {
  constructor(appointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  async insertOne(
    state,
    value,
    doctorName,
    date,
    cxName,
    cxDocNumber,
    cxPhone
  ) {
    // const isValid = await this.findByDate()
    let appointment_id = v4();
    const appointment = await this.appointmentRepository.insert(
        state, value, doctorName,  date, cxName, cxDocNumber, cxPhone, appointment_id
    );
    return appointment;
  }

  async readAll() {
    const appointments = await this.appointmentRepository.readAll();
    return appointments;
  }

  findByDate(input_date) {
    const appointments = await this.appointmentRepository.findByDate(input_date);
    return appointments;
  }

  findByRangeDate(initialDate, endDate) {
    const appointments = await this.appointmentRepository.findByRangeDate(initialDate, endDate);
    return appointments;
  }

  findByIdOrDocumentNumber(customerDoc) {
    const appointments = await this.appointmentRepository.findByDocumentNumber(customerDoc);
    return appointments;
  }

  update(state, value, doctorName,  date, cxName, cxDocNumber, cxPhone, appointmentId) {
    const oldApp = await this.appointmentRepository.findById(appointmentId);
    const newApp = await this.appointmentRepository.update(state, value, doctorName,  date, cxName, cxDocNumber, cxPhone, appointmentId)
    return newApp;
}

  delete(appointmentId) {
    const result = await this.appointmentRepository.delete(appointmentId)
    return result;
  }
}

module.exports = AppointmentService;
