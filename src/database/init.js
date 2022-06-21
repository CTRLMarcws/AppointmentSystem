const mysql = require("mysql2/promise");
const config = require("../../config/default.json");

const configEnv = Object.values(config.database).at(
  Object.keys(config.database).findIndex(
    (key) => key == config.actualEnviroment
  )
);

async function init() {
  console.log("checking if database and tables exists");
  let conn;
  try {
    conn = await mysql.createConnection(configEnv);
  } catch (error) {
    if (error.code == "ER_BAD_DB_ERROR") {
      let tmpConfigEnv = { ...configEnv };
      delete tmpConfigEnv.database;

      conn = await mysql.createConnection(tmpConfigEnv);
      await conn.query(`CREATE DATABASE IF NOT EXISTS ${configEnv.database}`);
      await conn.query(`USE ${configEnv.database}`);

      console.log(`new database created ${configEnv.database}`);
    } else {
      console.error(error);
    }
  }

  const appointmentTable = `CREATE TABLE IF NOT EXISTS APPOINTMENT (
    appointment_id VARCHAR(36) PRIMARY KEY NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_state VARCHAR(10) NOT NULL,
    doctor_name VARCHAR(50) NOT NULL,
    appointment_value DECIMAL(5,2) NOT NULL,
    cx_name VARCHAR(50) NOT NULL,
    cx_doc_number BIGINT NOT NULL,
    cx_phone_number BIGINT NOT NULL
    )`;

  conn.query(appointmentTable);

  const procedure = `CREATE PROCEDURE Proc_ReadAll ()
                        BEGIN
                            SELECT appointment_id, 
                            appointment_date,
                            appointment_state,
                            doctor_name,
                            appointment_value,
                            cx_name,
                            cx_doc_number,
                            cx_phone_number
                        FROM appointment;
                        END;`;

  conn.query(`DROP PROCEDURE IF EXISTS Proc_ReadAll`);
  conn.query(procedure);
  await conn.commit();
}

module.exports = { init };
