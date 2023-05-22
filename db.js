const Sequelize = require("sequelize");

const sequelize = new Sequelize(
   'bookapp',
   'root',
   "123456789",
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: 3306,
      logging: false
    }
  );

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

connectDB();