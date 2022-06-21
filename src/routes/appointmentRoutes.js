const { Router } = require("express");
const AppointmentService = require("../services/appointmentServices");
const AppointmentRepository = require("../repository/appointmentRepository");

const router = Router();
const repo = new AppointmentRepository();
const service = new AppointmentService(repo);

router.use(function timeLog(req, res, next) {
  console.log(
    "Requisição: ",
    req.method,
    req.url,
    " às ",
    new Date().toISOString()
  );
  next();
});

// /:id
router.get("/", async (req, res) => {
  const appointments = await service.readAll();
  console.log(appointments);
  return res.render("appointment.html", { apps: appointments });
});

router.post("/applynew", async (req, res) => {
    try {
    const body = req.body;
    const date = body.app_date.substring(0,10)

    const appointment = await service.insertOne(
      body.app_state,
      body.app_value,
      body.app_doctorName,
      date,
      body.app_cxName,
      body.app_cxDocNumber,
      body.app_cxPhone,
    );
    return res.render("appointment.html", { saved: true });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/findByDate", async (req, res) => {
  try {
    const params = req.params;
    let appointments;
    if (!params.endDate) {
      appointments = await service.findByDate(params.initialDate);
    } else {
      appointments = await service.findByRangeDate(
        params.initialDate,
        params.endDate
      );
    }
    return res.render("appointment.html", { apps: appointments });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/update", async (req, res) => {
  try {
    const body = req.body;
    const date = body.app_date.substring(0,10)
    console.log(body, date)
    const appointment = await service.update(
      body.app_state,
      body.app_value,
      body.app_doctorName,
      date,
      body.app_cxName,
      body.app_cxDocNumber,
      body.app_cxPhone,
      body.appointment_id
    );
    return res.render("appointment.html", { saved: true });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/search-document", async (req, res) => {
  try {
    const query = req.query;
    const appointment = await service.findByDocumentNumber(query.app_cxDocNumber)
    return res.render("appointment.html", {apps: appointment})
  } catch (error) {
    
  }
})

router.delete("/delete", async (req, res) => {
  try {
    const body = req.body;
    console.log(body.appointment_id)
    const appointment = await service.delete(body.appointment_id);
    return res.render("appointment.html", { saved: true });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
