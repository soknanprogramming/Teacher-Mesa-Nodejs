const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    ProductID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Category: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    img: {
        type: DataTypes.CHAR(255),
        allowNull: true
    }
}, {
    tableName: 'products',
    timestamps: false
});

module.exports = Product;