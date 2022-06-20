const { v4 } = require('uuid');

class Customer {

    constructor(
        customer_name,
        mobile_number,
        document_number,
        customer_address,
        notes,
    ) {
        this.customer_id = v4();
        this.customer_name = customer_name;
        this.mobile_number = mobile_number;
        this.document_number = document_number;
        this.customer_address = customer_address;
        this.notes = notes;
    }
}

module.exports = Customer;