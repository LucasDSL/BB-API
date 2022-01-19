'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customers.hasMany(models.Orders, {
        "foreignKey": "customerId"
      })
    }
  }
  Customers.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    customerAddress: DataTypes.STRING,
    cpf: DataTypes.INTEGER,
    cellphone: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Customers',
  });
  return Customers;
};