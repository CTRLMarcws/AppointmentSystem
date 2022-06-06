import { v4 } from 'uuid';

class Appointment {

    constructor(
        customer_name,
    ) {
        this.appointment_id = v4();
        this.customer_name = customer_name;
    }
}

export default Appointment;