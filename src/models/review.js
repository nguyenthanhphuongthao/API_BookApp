'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        Review.belongsTo(models.Book, {
          foreignKey: 'book_id',
          as: 'book'
        });
        Review.belongsTo(models.User, {
          foreignKey: 'user_id',
          as: 'user'
        });
        Review.belongsTo(models.Status, {
          foreignKey: 'status_id',
          as: 'status'
        });
    }
  }
  Review.init({
    book_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    tcontent: DataTypes.STRING,
    rate: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};