'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.Post, {
        as: 'post',
        foreignKey: 'post_id' });
      Like.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id' });
      Like.belongsTo(models.Status, {
        as: 'status',
        foreignKey: 'status_id' });
    }
  }
  Like.init({
    post_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};