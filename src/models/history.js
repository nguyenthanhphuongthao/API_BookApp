'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      History.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id' });
      History.belongsTo(models.Book, {
        as: 'book',
        foreignKey: 'book_id' });
      History.belongsTo(models.Status, {
        as: 'status',
        foreignKey: 'status_id' });
    }
  }
  History.init({
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    location: DataTypes.STRING,
    current_page: DataTypes.INTEGER,
    highlights: DataTypes.JSON,
    bookmarks: DataTypes.JSON,
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};