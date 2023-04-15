module.exports = (sequelize, dataTypes) => {
    let alias = 'Subcategorys';
    let cols = {
        idSubCategory: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        idCategory: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false
        },
    };
    let config = {
        tableName: "subcategorys",
        timestamps: false,
    }
    const Subcategorys = sequelize.define(alias, cols, config);

    return Subcategorys
};