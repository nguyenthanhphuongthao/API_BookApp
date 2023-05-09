'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Post, {
        as: 'post',
        foreignKey: 'post_id' });
      Comment.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id' });
      Comment.belongsTo(models.Status, {
        as: 'status',
        foreignKey: 'status_id' });
    }
  }
  Comment.init({
    post_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    tcontent: DataTypes.STRING,
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};