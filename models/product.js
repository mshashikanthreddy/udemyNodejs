const Sequelize = require('sequelize');

const sequelize = require('../util/database');  // database pool of connections

// create we create a model in which 'product' is name. we use the js objects in sequelize
const Product = sequelize.define('product' , {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement : true,
    allowNull : false,
    primaryKey : true,
  },
  title: Sequelize.STRING,
  price: {
    type : Sequelize.DOUBLE,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type : Sequelize.STRING,
    allowNull: false
  }
});  

module.exports = Product;