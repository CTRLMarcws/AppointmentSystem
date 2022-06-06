const { Appointment } = require('../models/Appointment');
//responsavel por obter dados no banco, é chamado pela service.

class AppointmentRepository {
    constructor() {
        this.appointments = null;
    }
    
    insert(id){
        //execute sql?
        const query = `INSERT INTO appointments(id) VALUES (?)`;
        const values = [id];
        function fallback(err){
            if (err) {
                return err;
            }
            return render(pag, {saved: true});
        }
        db.run(query, values, fallback)
    }

    readAll() {}

    findByDate() {}

    findByRangeDate() {}

    findByIdOrDocumentNumber() {}

    update() {}

    delete() {}
}