const { Router } = require('express');
const AppointmentService = require('../services/appointmentServices');
const AppointmentRepository = require('../repository/appointmentRepository');

const router = Router();
const repo = new AppointmentRepository();
const service = new AppointmentService(repo);

router.use(function timeLog(req, res, next) {
    console.log('Requisição: ', req.method, req.url, ' às ', Date.now());
    next();
});

// /:id
router.get('/', async (req, res) => {
    const appointments = await service.readAll();
    console.log(appointments)
    return res.json(appointments)
});

router.post('/applynew', (req, res) => {
    try {
        const { appointment_id } = req.body;

        const appointment = service.insertOne({
            appointment_id
        })
        return res.json(appointment)
    } catch (error) {
        return response.status(400).json({ error })
    }
})

module.exports = router;
