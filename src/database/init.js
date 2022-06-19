const mysql = require("mysql2/promise");
const config = require("../../config/default.json");

const configEnv = Object.values(config.database).at(
  Object.keys(config.database).findIndex(
    (key) => key == config.actualEnviroment
  )
);

async function init() {
  console.log("initializing database");
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
    if (tables[0].findIndex(t => t.Tables_in_schedulerdatabase == 'customer') < 0) {
      const customerTable = `CREATE TABLE CUSTOMER(
                 customer_id VARCHAR(36) PRIMARY KEY NOT NULL,
                 customer_name VARCHAR(50) NOT NULL,
                 mobile_number BIGINT NOT NULL,
                 document_number BIGINT NOT NULL,
                 address VARCHAR(100),
                 notes VARCHAR (50)
             )`;
      await conn.query(customerTable);
      console.log("created customer table");
    }

    if (tables[0].findIndex(t => t.Tables_in_schedulerdatabase == 'appointment') < 0) {
      const appointmentTable = `CREATE TABLE APPOINTMENT (
                 appointment_id VARCHAR(36) PRIMARY KEY NOT NULL,
                 appointment_date TIMESTAMP NOT NULL,
                 appointment_state VARCHAR(10) NOT NULL,
                 doctor_name VARCHAR(50) NOT NULL,
                 appointment_value float NOT NULL,
                 cx_id VARCHAR(36) NOT NULL,
                 cx_docnum BIGINT NOT NULL
             )`;
/*              CONSTRAINT APPOINTMENT_CX_ID FOREIGN KEY (cx_id) REFERENCES CUSTOMER (customer_id),
             CONSTRAINT APPOINTMENT_CX_DOCNUM FOREIGN KEY (cx_docnum) REFERENCES CUSTOMER (document_number) */
      await conn.query(appointmentTable);
      console.log("created appointment table");
    }
  } catch (error) {
    console.error(error);
  }

  await conn.commit();
}

module.exports = { init };
