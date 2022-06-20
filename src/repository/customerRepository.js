const { Customer } = require("../models/Customer");
const { execute, format } = require("../database/index");
//responsavel por obter dados no banco, é chamado pela service.

class CustomerRepository {
  constructor() {
    this.customers = null;
  }
async insert (){};
async readAll (){};
async findByDocNumber (){};
async update (){};
async delete (){};
}

module.exports = CustomerRepository;
customer_id,
        customer_name,
        mobile_number,
        document_number,
        customer_address,
        notes