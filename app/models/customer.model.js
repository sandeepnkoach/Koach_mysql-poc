const sql = require("./db.js");

// constructor
const Customer = function(customer) {
  this.adminemail = customer.adminemail;
  this.companyname = customer.companyname;
  this.communicationemail = customer.communicationemail;
  this.address = customer.address;
  this.acc_description = customer.acc_description;
  this.accountstatus = customer.accountstatus;
  };


Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO add_account SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created account: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};


Customer.findById = (customerId, result) => {
  sql.query(`SELECT * FROM add_account WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};




Customer.getAll = result => {
  sql.query("SELECT * FROM add_account", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("add_account: ", res);
    result(null, res);
  });
};



Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE add_account SET adminemail = ?, companyname = ?, communicationemail = ?, address = ?, acc_description = ?, accountstatus = ? WHERE id = ?",
    [customer.adminemail, customer.companyname, customer.communicationemail, customer.address, customer.acc_description, customer.accountstatus, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};



Customer.remove = (id, result) => {
  sql.query("DELETE FROM add_account WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};



Customer.removeAll = result => {
  sql.query("DELETE FROM add_account", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} add_account`);
    result(null, res);
  });
};





module.exports = Customer;
