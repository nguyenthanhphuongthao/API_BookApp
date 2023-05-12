'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.belongsTo(models.Publisher, {
        as: 'publisher',
        foreignKey: 'publisher_id' });
      Book.belongsTo(models.Category, {
        as: 'category',
        foreignKey: 'category_id' });
      Book.belongsTo(models.Status, {
        as: 'status',
        foreignKey: 'status_id' });
      Book.hasMany(models.History, {
        as: 'histories',
        foreignKey: 'book_id' });
    }
  }
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    publisher_id: DataTypes.INTEGER,
    description: DataTypes.TEXT('long'),
    page_number: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    link: DataTypes.STRING,
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};