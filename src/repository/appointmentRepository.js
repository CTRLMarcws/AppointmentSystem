const { Appointment } = require('../models/Appointment');
const { execute, format } = require('../database/index');
//responsavel por obter dados no banco, é chamado pela service.

class AppointmentRepository {
    constructor() {
        this.appointments = null;
    }
    
    insert({id}){
        const query = `INSERT INTO appointments(id) VALUES (?)`;
        const values = [id];
        try {
            execute(format(query, values));
        } catch (error) {
            //error handler
        }
    }

    async readAll() {
        const query = `SELECT * FROM appointments`;
        const results = await execute(query)
        return results;
    }

    async findByDate() {
        const query = ``
        const results = await execute(query);
        return results;
    }

    findByRangeDate() {}

    findByIdOrDocumentNumber() {}

    update() {}

    delete() {}
}

module.exports = AppointmentRepository;