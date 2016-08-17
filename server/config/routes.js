var Customers = require('./../controllers/customers.js');
var Orders = require('./../controllers/orders.js');
var Products = require('./../controllers/products.js');

module.exports = function(app){
// Customers
app.post('/addCustomer', Customers.add);
app.get('/allCustomers', Customers.getAll);
app.post('/destroy/:id', Customers.destroy);

// Products
app.get('/getAll', Products.getAll);
app.post('/createProduct', Products.create);
// Orders
app.get('/getAllOrders', Orders.getAllOrders);
app.post('/createOrder', Orders.createOrder);

}

