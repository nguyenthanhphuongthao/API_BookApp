'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blacklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Blacklist.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
  Blacklist.init({
    user_id: DataTypes.INTEGER,
    token: DataTypes.STRING,
    isValid: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Blacklist',
  });
  return Blacklist;
};