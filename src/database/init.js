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

  try {
    const tables = await conn.query(`SHOW TABLES`);
      if (tables[0].findIndex(t => t.Tables_in_schedulerdatabase == 'appointment') < 0) {
      const appointmentTable = `CREATE TABLE APPOINTMENT (
        appointment_id VARCHAR(36) PRIMARY KEY NOT NULL,
        appointment_date TIMESTAMP NOT NULL,
        appointment_state VARCHAR(10) NOT NULL,
        doctor_name VARCHAR(50) NOT NULL,
        appointment_value DECIMAL(5,2) NOT NULL,
        cx_name VARCHAR(50) NOT NULL,
        cx_doc_number BIGINT UNIQUE NOT NULL,
        cx_phone_number BIGINT UNIQUE NOT NULL
             )`;
      await conn.query(appointmentTable);
      console.log("created appointment table");
    }
  } catch (error) {
    console.error(error);
  }

  await conn.commit();
}

module.exports = { init };
