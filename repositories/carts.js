const Repository = require('./repository');

class CartsRepository extends Repository{}


exports.module = new CartsRepository('carts.json');