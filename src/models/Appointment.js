const { v4 } = require('uuid');

class Appointment {

    constructor(
        appointment_date,
        appointment_state,
        doctor_name,
        appointment_value,
        customer_id
    ) {
        this.appointment_id = v4();
        this.appointment_date = appointment_date;
        this.appointment_state = appointment_state;
        this.doctor_name = doctor_name;
        this.appointment_value = appointment_value;
        this.customer_id = customer_id;
    }
}

module.exports = Appointment;