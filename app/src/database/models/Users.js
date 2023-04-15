module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';
    let cols = {
        idUser: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        email: {
            type: dataTypes.STRING(80),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(80),
            allowNull: false
        },
        typeOfAccess: {
            type: dataTypes.STRING(15),
            allowNull: false
        },
        idUserDetail: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
    };
    let config = {
        tableName: "users",
        timestamps: false,
    }
    const Users = sequelize.define(alias, cols, config);

    return Users
};