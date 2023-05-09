'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Share extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Share.belongsTo(models.Post, {
        as: 'post',
        foreignKey: 'post_id' });
      Share.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id' });
      Share.belongsTo(models.Status, {
        as: 'status',
        foreignKey: 'status_id' });
    }
  }
  Share.init({
    post_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    tcontent: DataTypes.STRING,
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Share',
  });
  return Share;
};