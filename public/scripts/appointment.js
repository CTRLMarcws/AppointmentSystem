const mock = require('../../src/database/test.json');
const table = document.querySelector(".table tbody");

var tmplSource = document.getElementById("tmplLinha").innerHTML;
// var tmplHandle = Handlebars.compile(tmplSource);


/*
date "app_date"
*/
const today = new Date().toISOString().substring(0,16);
document.getElementById("app_date").min = '2019-02-17T10:38';

for (let i = 0; i < mock.length; i++) {
  console.log(mock[i])
  const appointment = {};
  // var pessoa = {};
  appointment.appointment_date = mock[i].appointment_date;
  appointment.appointment_state = mock[i].appointment_state;
  appointment.doctor_name = mock[i].doctor_name;
  appointment.cust_name = mock[i].cust_name;
  appointment.appointment_value = mock[i].appointment_value;
  
  let row = {};
  row.template = document.createElement("template");
  row.template.innerHTML = tmplHandle(appointment);
  row.content = document.importNode(row.template.content, true);

  table.appendChild(row.content);
}