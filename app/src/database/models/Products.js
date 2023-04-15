module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
    let cols = {
        idProduct: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(8,2),
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        sold: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
        idSubCategory: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
    };
    let config = {
        tableName: "products",
        timestamps: false,
    }
    const Products = sequelize.define(alias, cols, config);

    return Products
};