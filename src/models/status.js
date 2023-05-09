'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Status.hasMany(models.Post, {
        as: 'posts',
        foreignKey: 'status_id' });
      Status.hasMany(models.Comment, {
        as: 'comments',
        foreignKey: 'status_id' });
      Status.hasMany(models.Like, {
        as: 'likes',
        foreignKey: 'status_id' });
      Status.hasMany(models.Share, {
        as: 'shares',
        foreignKey: 'status_id' });
      Status.hasMany(models.History, {
        as: 'histories',
        foreignKey: 'status_id' });
      Status.hasMany(models.Book, {
        as: 'books',
        foreignKey: 'status_id' });
    }
  }
  Status.init({
    code: DataTypes.STRING,
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};