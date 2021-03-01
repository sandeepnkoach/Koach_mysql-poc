const sql = require("./db.js");

const Customer2 = function(customer2) {
    this.licence=customer2.licence,
    this.goallimit= customer2.goallimit,
    this.preassementgoal=customer2.preassementgoal,
    this.enablehumancoach= customer2.enablehumancoach,
    this.mentorcall=customer2.mentorcall,
    this.chatlimit=customer2.chatlimit,
    this.userlimit=customer2.userlimit,
    this.email=customer2.email,
    this.suspended=customer2.suspended
  };

  Customer2.create = (newCustomer, result) => {
    sql.query("INSERT INTO licence SET ?", newCustomer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created licence: ", { id: res.insertId, ...newCustomer });
      result(null, { id: res.insertId, ...newCustomer });
    });
  };
  
  Customer2.findById = (customerId, result) => {
    sql.query(`SELECT * FROM licence WHERE id = ${customerId}`, (err, res) => {
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

  Customer2.getAll = result => {
    sql.query("SELECT * FROM licence", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("add_account: ", res);
      result(null, res);
    });
  };

  Customer2.updateById = (id, customer, result) => {
    sql.query(
      "UPDATE licence SET licence = ?, goallimit = ?, preassementgoal = ?, enablehumancoach = ?, mentorcall = ?, chatlimit = ?,userlimit = ?, email = ?,suspended = ?  WHERE id = ?",
      [customer2.licence, customer2.goallimit, customer2.preassementgoal, customer2.enablehumancoach, customer2.mentorcall, customer2.chatlimit,customer2.userlimit,customer2.email,customer2.suspended, id],
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

  Customer2.remove = (id, result) => {
    sql.query("DELETE FROM licence WHERE id = ?", id, (err, res) => {
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
  
      console.log("deleted licence with id: ", id);
      result(null, res);
    });
  };

  Customer2.removeAll = result => {
    sql.query("DELETE FROM licence", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} add_account`);
      result(null, res);
    });
  };

  module.exports = Customer2;