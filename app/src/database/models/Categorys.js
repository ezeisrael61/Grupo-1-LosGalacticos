module.exports = (sequelize, dataTypes) => {
    let alias = 'Categorys';
    let cols = {
        idCategory: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
    };
    let config = {
        tableName: "categorys",
        timestamps: false,
    }
    const Categorys = sequelize.define(alias, cols, config);

    return Categorys
};