module.exports = (sequelize, dataTypes) => {
    let alias = 'Images';
    let cols = {
        idImage: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        idProduct: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
    };
    let config = {
        tableName: "images",
        timestamps: false,
    }
    const Images = sequelize.define(alias, cols, config);

    return Images
};