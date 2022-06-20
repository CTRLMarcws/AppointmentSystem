const { v4 } = require('uuid');

class Appointment {

    constructor(
        appointment_date,
        appointment_state,
        doctor_name,
        appointment_value,
        cx_id,
        cx_name,
        cx_doc_number,
        cx_phone_number
    ) {
        this.appointment_id = v4();
        this.appointment_date = appointment_date;
        this.appointment_state = appointment_state;
        this.doctor_name = doctor_name;
        this.appointment_value = appointment_value;
        this.cx_id = cx_id;
        this.cx_name = cx_name;
        this.cx_doc_number = cx_doc_number;
        this.cx_phone_number = cx_phone_number;
    }
}

module.exports = Appointment;