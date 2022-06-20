const { Router } = require('express');
const AppointmentService = require('../services/appointmentServices');
const AppointmentRepository = require('../repository/appointmentRepository');

const router = Router();
const repo = new AppointmentRepository();
const service = new AppointmentService(repo);

router.use(function timeLog(req, res, next) {
    console.log('Requisição: ', req.method, req.url, ' às ', new Date().toISOString());
    next();
});

// /:id
router.get('/', async (req, res) => {
    const appointments = await service.readAll();
    console.log(appointments)
    return res.render('appointment.html', {apps: appointments})
});

router.post('/applynew', async (req, res) => {
    console.log('requisição', req)
    try {
        const body = req.body;
        const appointment = await service.insertOne(
            body.cx_doc_number,
            body.app_value,
            body.app_state,
            body.app_doc_name,
            body.app_date
            )
        return res.render('appointment.html', { saved: true })
    } catch (error) {
        return res.status(400).json({ error })
    }
})

module.exports = router;
