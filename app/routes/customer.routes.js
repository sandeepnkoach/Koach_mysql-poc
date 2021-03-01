module.exports = app => {
    const add_account = require("../controllers/customer.controller.js");

    // Create a new Customer
    app.post("/add_account", add_account.create);
    
    // Retrieve all Customers
    app.get("/add_account", add_account.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/add_account/:customerId", add_account.findOne);
  
    // Update a Customer with customerId
    app.put("/add_account/:customerId", add_account.update);
  
    // Delete a Customer with customerId
    app.delete("/add_account/:customerId", add_account.delete);
  
    // Create a new Customer
    app.delete("/add_account", add_account.deleteAll);
  };