'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, { 
        as: 'posts',
        foreignKey: 'user_id' });
      User.hasMany(models.Comment, {
        as: 'comments',
        foreignKey: 'user_id' });
      User.hasMany(models.Like, {
        as: 'likes',
        foreignKey: 'user_id' });
      User.hasMany(models.Share, {
        as: 'shares',
        foreignKey: 'user_id' });
      User.hasMany(models.History, {
        as: 'histories',
        foreignKey: 'user_id' });
      User.belongsTo(models.Role, {
        as: 'role',
        foreignKey: 'role_id' });
      User.hasMany(models.Blacklist, {
        as: 'blacklists',
        foreignKey: 'user_id' });
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    full_name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    token: DataTypes.STRING,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};