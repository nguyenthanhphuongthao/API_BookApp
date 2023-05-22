'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.hasMany(models.Comment, {
        as: 'comments',
        foreignKey: 'post_id' });
      Post.hasMany(models.Like, {
        as: 'likes',
        foreignKey: 'post_id' });
      Post.belongsTo(models.Status, {
        as: 'status',
        foreignKey: 'status_id' });
      Post.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id' });
      Post.belongsTo(models.Book, {
        as: 'book',
        foreignKey: 'book_id' });
    }
  }
  Post.init({
    user_id: DataTypes.INTEGER,
    tcontent: DataTypes.STRING,
    image: DataTypes.STRING,
    book_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};