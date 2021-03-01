module.exports = app => {
    const licence = require("../controllers/licence.controller.js");
    // Create a new Customer
    app.post("/licence", licence.create);
    
    // Retrieve all Customers
    app.get("/licence", licence.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/licence/:customerId", licence.findOne);
  
    // Update a Customer with customerId
    app.put("/licence/:customerId", licence.update);
  
    // Delete a Customer with customerId
    app.delete("/licence/:customerId", licence.delete);
  
    // Create a new Customer
    app.delete("/licence", licence.deleteAll);
  };