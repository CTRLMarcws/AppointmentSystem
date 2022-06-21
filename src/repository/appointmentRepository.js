const { Appointment } = require("../models/Appointment");
const { execute, format } = require("../database/index");
//responsavel por obter dados no banco, é chamado pela service.

class AppointmentRepository {
  constructor() {
    this.appointments = null;
  }

  async insert(state, value, doctorName,  date, cxName, cxDocNumber, cxPhone, appointmentId) {
    const query = `INSERT INTO APPOINTMENT (
      appointment_id,
      appointment_date,
      appointment_state,
      appointment_value,
      doctor_name,
      cx_name,
      cx_doc_number,
      cx_phone_number
      )
      VALUES (?,?,?,?,?,?,?,?)`;
      const values = [appointmentId, date, state, value, doctorName, cxName, cxDocNumber, cxPhone ];
      try {
      await execute(format(query, values));
    } catch (error) {
      console.error(error)
    }
  }

  async readAll() {
    const query = `CALL Proc_ReadAll()`
    /* const query = `SELECT A.appointment_id,
                  A.appointment_state,
                  A.appointment_value,
                  A.doctor_name,
                  A.appointment_date,
                  A.cx_name,
                  A.cx_doc_number,
                  A.cx_phone_number
                FROM APPOINTMENT AS A
                `; */
    const results = await execute(query);
    return results[0];
  }

  async findByDate(input_date) {
    const values = [input_date];
    const query = `SELECT A.appointment_id,
                      A.appointment_state,
                      A.appointment_value,
                      A.doctor_name,
                      A.appointment_date,
                      A.cx_name,
                      A.cx_doc_number,
                      A.cx_phone_number
                      FROM APPOINTMENT AS A
                    WHERE A.appointment_date = ?`;
    const results = await execute(format(query, values));
    return results;
  }

  async findByRangeDate(initialDate, endDate) {
    const values = [initialDate, endDate];
    const query = ` SELECT A.appointment_id,
                      A.appointment_state,
                      A.appointment_value,
                      A.doctor_name,
                      A.appointment_date,
                      A.cx_name,
                      A.cx_doc_number,
                      A.cx_phone_number
                      FROM APPOINTMENT AS A
                    WHERE A.appointment_date BETWEEN ? AND ?
                `;
    const results = await execute(format(query, values));
    return results;
  }

  async findByDocumentNumber(customerDoc) {
    const values = [customerDoc];
    const query = `SELECT A.appointment_id,
                      A.appointment_state,
                      A.appointment_value,
                      A.doctor_name,
                      A.appointment_date,
                      A.cx_name,
                      A.cx_doc_number,
                      A.cx_phone_number
                      FROM APPOINTMENT AS A
                    WHERE A.cx_doc_number = ?
                `;
    const results = await execute(format(query, values));
    return results;
  }

  async findById(appointmentId) {
    const values = [appointmentId];
    const query = `SELECT A.appointment_id,
                      A.appointment_state,
                      A.appointment_value,
                      A.doctor_name,
                      A.appointment_date,
                      A.cx_name,
                      A.cx_doc_number,
                      A.cx_phone_number
                      FROM APPOINTMENT AS A
                    WHERE A.appointment_id = ?
                `;
    const results = await execute(format(query, values));
    return results;
  }

  async update(state, value, doctorName,  date, cxName, cxDocNumber, cxPhone, appointmentId) {
    const query = `UPDATE APPOINTMENT
                SET appointment_date = ?,
                appointment_state = ?,
                appointment_value = ?,
                doctor_name = ?,
                cx_name = ?,
                cx_doc_number = ?,
                cx_phone_number = ?       
            WHERE appointment_id = ?`;
            const values = [date, state, value, doctorName, cxName, cxDocNumber, cxPhone, appointmentId];

    const results = await execute(format(query, values));
    return results;
  }

  async delete(appointmentId) {
    const values = [appointmentId];
    const query = ` DELETE FROM APPOINTMENT
                    WHERE appointment_id = ?`;
    const results = await execute(format(query, values));
    return results;
  }
}

module.exports = AppointmentRepository;
