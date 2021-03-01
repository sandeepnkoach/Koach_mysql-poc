const Customer2 = require("../models/licence.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const customer2 = new Customer2({
      licence: req.body.licence,
      goallimit: req.body.goallimit,
      preassementgoal: req.body.preassementgoal,
      enablehumancoach: req.body.enablehumancoach,
      mentorcall: req.body.mentorcall,
      chatlimit: req.body.chatlimit,
      userlimit: req.body.userlimit,
      email:req.body.email,
      suspended:req.body.suspended
    }); 
  
     // Save licence in the database
     Customer2.create(customer2, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
  };

  // Retrieve all lincece from the database.
exports.findAll = (req, res) => {
    Customer2.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
  };

  // Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Customer2.findById(req.params.customerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found licence with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving licence with id " + req.params.customerId
          });
        }
      } else res.send(data);
    });
  };

  // Update a licence identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Customer2.updateById(
      req.params.customerId,
      new Customer2(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Customer with id " + req.params.customerId
            });
          }
        } else res.send(data);
      }
    );
  };

  // Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Customer2.remove(req.params.customerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.customerId
          });
        }
      } else res.send({ message: `Customer was deleted successfully!` });
    });
  };

  // Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Customer2.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };